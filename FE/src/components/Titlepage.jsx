/* eslint-disable no-unused-vars */

export function Titlepage({ title, icon: Icon }) {
  return (
    <>
      <div className="titlePage bg-white p-2 flex mb-3 items-center">
        <Icon className="text-4xl text-gray-700" />
        <h1 className="text-3xl ms-2 font-bold text-gray-700 ">{title}</h1>
      </div>
    </>
  );
}
