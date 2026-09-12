import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loader from "./loader";
import { GetApiHandler } from "@/apiHandler/appConfig";
import { BASE_URL } from "@/apiHandler/endPoints";

const ExerciseCard = ({ item }) => {
  const [imageUrl, setImageUrl] = useState(item.gifUrl || null);

  useEffect(() => {
    let mounted = true;
    let objectUrl = null;
    const id = item.id || item.exerciseId || item._id;
    if (!id) return;

    // fetch via local proxy so the RapidAPI key stays server-side
    const url = `/api/image?exerciseId=${id}&resolution=180`;

    const base64ToBlob = (b64Data, contentType = "image/png") => {
      const byteString = atob(b64Data);
      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    };

    const hexToBlob = (hex, contentType = "image/png") => {
      const len = hex.length / 2;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return new Blob([arr], { type: contentType });
    };

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("network response was not ok");

        const contentType = (res.headers.get("content-type") || "").toLowerCase();

        // If server returns an image binary
        if (contentType.startsWith("image/")) {
          const blob = await res.blob();
          if (!mounted) return;
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
          return;
        }

        // Otherwise read as text (could be JSON with base64/hex, raw base64, or hex)
        const text = await res.text();

        // Try JSON first
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (e) {
          parsed = null;
        }

        if (parsed) {
          // common fields for base64 payload
          const b64 = parsed.base64 || parsed.imageBase64 || parsed.data || parsed.img;
          if (typeof b64 === "string") {
            const dataUrlMatch = b64.match(/^data:(.+);base64,(.+)$/);
            let mime = "image/png";
            let payload = b64;
            if (dataUrlMatch) {
              mime = dataUrlMatch[1];
              payload = dataUrlMatch[2];
            }
            const blob = base64ToBlob(payload, mime);
            if (!mounted) return;
            objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
            return;
          }

          const hex = parsed.hex || parsed.dataHex;
          if (typeof hex === "string" && /^[0-9a-fA-F]+$/.test(hex)) {
            const blob = hexToBlob(hex);
            if (!mounted) return;
            objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
            return;
          }
        }

        // If not JSON, inspect raw text
        const raw = text.trim();
        // data URL
        const dataUrlMatch = raw.match(/^data:(.+);base64,(.+)$/);
        if (dataUrlMatch) {
          const mime = dataUrlMatch[1];
          const payload = dataUrlMatch[2];
          const blob = base64ToBlob(payload, mime);
          if (!mounted) return;
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
          return;
        }

        // raw base64 (heuristic)
        if (/^[A-Za-z0-9+/=\s]+$/.test(raw) && raw.length % 4 === 0) {
          const payload = raw.replace(/\s+/g, "");
          const blob = base64ToBlob(payload);
          if (!mounted) return;
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
          return;
        }

        // raw hex
        if (/^[0-9a-fA-F]+$/.test(raw)) {
          const blob = hexToBlob(raw);
          if (!mounted) return;
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
          return;
        }

        // fallback: treat as text (unlikely) — convert to blob
        const enc = new TextEncoder().encode(raw);
        const blob = new Blob([enc], { type: "image/png" });
        if (!mounted) return;
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (err) {
        // leave fallback (item.gifUrl or null)
      }
    })();

    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [item]);

  return (
    <div className="flex-wrap m-4">
      <div className="max-w-sm rounded bg-slate-100 overflow-hidden shadow-lg h-full">
        <div className="px-6 py-4">
          <div className="flex justify-center font-bold text-xl mb-2 capitalize">
            <h1> {item.name}</h1>
          </div>
          <div className="flex justify-center">
            <img src={imageUrl || "/placeholder.png"} width="200" height="200" alt={item.name} />
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{item.equipment}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{item.bodyPart}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{item.target}
          </span>
        </div>
      </div>
    </div>
  );
};

const Cards = ({
  currentItems,
  handlePageClick,
  pageCount,
  isLoading,
  error = "",
}) => {
  return (
    <div className=" mx-16 min-h-screen my-10 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
      <div className="flex justify-center p-1 min-h-screen">
        {error.length ? (
          <div className="w-full flex justify-center capitalize rounded overflow-hidden bg-white text-red-400 pt-16 font-bold text-4xl shadow-lg">
            <p>{error}!</p>
          </div>
        ) : (
          <div className="w-full  rounded overflow-hidden bg-white text-black shadow-lg">
            {isLoading ? (
              <Loader />
            ) :
            
              !currentItems ?  <div className=" flex justify-center mt-16 text-center">
                           <p className="text-gray-400 text-3xl">
                No exercises found!{" "}
              </p>            
              </div>
             
            :
             (
              <div className="grid grid-cols-4 gap-4">
                {currentItems && currentItems.length && (
                  currentItems.map((item) => {
                    const keyVal = item.id || item.exerciseId || item._id || item.name;
                    return <ExerciseCard item={item} key={keyVal} />;
                  })
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-end gap-3">
        <ul>
          {" "}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </ul>
      </div>
    </div>
  );
};

export default Cards;
