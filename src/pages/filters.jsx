import { useState } from "react";

const Filters = ({ bodyPartListData,filterByBodyPart, muscleListData,filterByTargetMuscle,equipmenttListData,filterByEquipment }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  function sendBodyPartSelected(value){
    setSelectedBodyPart(value);
    filterByBodyPart(value);
  }
  function sendMuscleSelected(value){
    setSelectedTargetMuscle(value);
    filterByTargetMuscle(value);
  }
  function sendSelectedEquipment(value){
    setSelectedEquipment(value);
    filterByEquipment(value);
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
                {bodyPartListData.map((item) => {
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
                {muscleListData.map((item) => {
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
                {equipmenttListData.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
