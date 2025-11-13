"use client";

export const ProjectsHeader = () => {
  return (
    <div className="bg-[#ebe8ff] text-[#736c93] rounded-xl w-full p-3 grid items-center gap-2 [grid-template-columns:repeat(25,minmax(0,1fr))] text-sm">
      <div className="col-span-3"></div>
      <div className="col-span-3 font-bold flex justify-center">
        <p>Pavadinimas</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>Reitingas</p>
      </div>
      <div className="col-span-1 font-bold flex justify-center">
        <p>Šalis</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>LTV</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>Surinkta</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>Tikslas</p>
      </div>
      <div className="col-span-1 font-bold flex justify-center">
        <p>Time</p>
      </div>
      <div className="col-span-1 font-bold flex justify-center">
        <p>Users</p>
      </div>
      <div className="col-span-1 font-bold flex justify-center">
        <p>Date</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>Progress bar</p>
      </div>
      <div className="col-span-2 font-bold flex justify-center">
        <p>Interest rate</p>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
