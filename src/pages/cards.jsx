import Image from "next/image";
import ReactPaginate from "react-paginate";
import Loader from "./loader";

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
                    return (
                      <div className="flex-wrap m-4" key={item}>
                        <div className="max-w-sm rounded bg-slate-100 overflow-hidden shadow-lg h-full">
                          <div className="px-6 py-4">
                            <div className="flex justify-center font-bold text-xl mb-2 capitalize">
                              <h1> {item.name}</h1>
                            </div>
                            <div className="flex justify-center">
                              <img src={item.gifUrl} width="200" height="200" />
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
                  })
                ) 
               
                }
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
