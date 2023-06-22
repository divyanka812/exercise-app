import { useState } from "react";
import {FaFilter} from 'react-icons/fa'
const Filters = ({ bodyPartListData,filterByBodyPart, muscleListData,filterByTargetMuscle,equipmenttListData,filterByEquipment,filterBySearch,handleResetFilter }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [isFilterApplied, setisFilterApplied] = useState(false);

  function sendBodyPartSelected(value){
    setSelectedBodyPart(value);
    filterByBodyPart(value);
    setisFilterApplied(true);
  }
  function sendMuscleSelected(value){
    setSelectedTargetMuscle(value);
    filterByTargetMuscle(value);
    setisFilterApplied(true);
  }
  function sendSelectedEquipment(value){
    setSelectedEquipment(value);
    filterByEquipment(value);
    setisFilterApplied(true);
  }
  function sendSearchKey(value){
    setSearchKey(value);
    filterBySearch(value);
    setisFilterApplied(true);
  }
  function resetFilter(){
    setSelectedBodyPart("");
    setSelectedTargetMuscle("");
    setSelectedEquipment("");
    setSearchKey("");
    setisFilterApplied(false);
    handleResetFilter();
  }
  return (
    <div className=" mx-16 my-10 rounded-md bg-gradient-to-r from-cyan-500 via-violet-500 to-green-500 p-1">
      <div className="flex justify-center">
        <div className="w-full rounded overflow-hidden bg-white text-black shadow-lg">
          <div className="flex justify-between m-8">
            <div className="flex flex-col w-max gap-3">
              <label className="font-medium">Select by search</label>
              <input
                placeholder="Search by name"
                className="border-2 rounded p-1"
                value={searchKey}
                onChange={(e)=>sendSearchKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-max gap-3">
              <label className="font-medium">Select by body part</label>
              <select
                className="border-2 rounded p-1"
                onChange={(e) => sendBodyPartSelected(e.target.value)}
                value={selectedBodyPart}
              >
                <option hidden>Select</option>
                {bodyPartListData && bodyPartListData.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col w-max gap-3">
            <label className="font-medium">Select by Target Muscle</label>
              <select
                className="border-2 rounded p-1"
                onChange={(e) => sendMuscleSelected(e.target.value)}
                value={selectedTargetMuscle}
              >
                <option hidden>Select</option>
                {muscleListData && muscleListData.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col w-max gap-3">
              <label className="font-medium">Select by Equipment part</label>
              <select
                className="border-2 rounded p-1"
                onChange={(e) => sendSelectedEquipment(e.target.value)}
                value={selectedEquipment}
              >
                <option hidden>Select</option>
                {equipmenttListData && equipmenttListData.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-row w-max gap-3 cursor-pointer" onClick={resetFilter}>
             <FaFilter className={isFilterApplied? "text-orange-400":"text-blue-400"}/>
             <p>Reset All</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
