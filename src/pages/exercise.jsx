"use client";
import { useEffect, useState } from "react";
import Cards from "./cards";
import Filters from "./filters";
import { BASE_URL, ENDPOINTS } from "@/apiHandler/endPoints";
import { GetApiHandler } from "@/apiHandler/appConfig";
import ReactPaginate from "react-paginate";

const Exercise = () => {
  const [allExerciseData, setAllExerciseData] = useState([]);
  const [bodyPartListData, setBodyPartListData] = useState([]);
  const [muscleListData, setMuscleListData] = useState([]);
  const [equipmenttListData, setEquipmenttListData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(false);
  const endOffset = itemOffset + itemsPerPage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allExerciseData.length;

    setItemOffset(newOffset);
  };
  function getAllExercises() {
    setisLoading(true);
    const getAllExercisesURL = BASE_URL + ENDPOINTS.allExercises;

    GetApiHandler(getAllExercisesURL, "GET")
      .then((response) => {
        if (response?.data) {
          setAllExerciseData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  function getBodyPartList() {
    setisLoading(true);
    const getAllExercisesURL = BASE_URL + ENDPOINTS.bodyPartList;

    GetApiHandler(getAllExercisesURL, "GET")
      .then((response) => {
        if (response?.data) {
          setBodyPartListData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  function getMuscleList() {
    setisLoading(true);
    const getMuscleListURL = BASE_URL + ENDPOINTS.targetMuscleList;

    GetApiHandler(getMuscleListURL, "GET")
      .then((response) => {
        if (response?.data) {
          setMuscleListData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }
  
  function getEquipmentList() {
    setisLoading(true);
    const getEquipmentURL = BASE_URL + ENDPOINTS.equipmentList;

    GetApiHandler(getEquipmentURL, "GET")
      .then((response) => {
        if (response?.data) {
          setEquipmenttListData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  function filterByEquipment(equipmentType) {
    console.log("filterByEquipment sbody part",equipmentType);

    setisLoading(true);
    const filterByTargetMuscleURL = BASE_URL + ENDPOINTS.equipment.replace('<equipmentType>', equipmentType);

    GetApiHandler(filterByTargetMuscleURL, "GET")
      .then((response) => {
        if (response?.data) {
          setAllExerciseData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  function filterByTargetMuscle(muscleName) {
    console.log("filterByTargetMuscle sbody part",muscleName);

    setisLoading(true);
    const filterByTargetMuscleURL = BASE_URL + ENDPOINTS.targetMuscle.replace('<muscleName>', muscleName);

    GetApiHandler(filterByTargetMuscleURL, "GET")
      .then((response) => {
        if (response?.data) {
          setAllExerciseData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  function filterByBodyPart(bodyPart) {
    setisLoading(true);
    const filterByBodyPartURL = BASE_URL + ENDPOINTS.bodyPart.replace('<bodyPart>', bodyPart);

    GetApiHandler(filterByBodyPartURL, "GET")
      .then((response) => {
        if (response?.data) {
          setAllExerciseData(response.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getAllExercises();
    getBodyPartList();
    getMuscleList();
    getEquipmentList();
  }, []);
  useEffect(() => {
    setPageCount(Math.ceil(allExerciseData.length / itemsPerPage));
  }, [allExerciseData, itemsPerPage]);

  useEffect(() => {
    setCurrentItems(allExerciseData.slice(itemOffset, endOffset));
  }, [itemOffset, endOffset]);
  useEffect(() => {
    setCurrentItems(allExerciseData.slice(itemOffset, endOffset));
  }, [itemOffset, endOffset, allExerciseData]);
  
  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">Get a healthier life</h1>
      </div>
      <Filters bodyPartListData={bodyPartListData} filterByBodyPart={filterByBodyPart}
      muscleListData={muscleListData} filterByTargetMuscle={filterByTargetMuscle}
      equipmenttListData={equipmenttListData} filterByEquipment={filterByEquipment}
      />
      <Cards
        currentItems={currentItems}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        isLoading={isLoading}
      />
      )
    </>
  );
};

export default Exercise;
