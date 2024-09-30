import { useState } from "react";
import csv from "../images/icon/csv.png"
import { Spin } from "antd";

const CommonFilter = ({ filter, setFilter, sortBy }) => {
    const [search, setSearch] = useState(filter.search || "");
    const [loading, setLoading] = useState(false);
    const isExpertPage = window.location.pathname ===  "/experts";
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex justify-end mb-3">
            <div className="p-3.5 relative xl:w-1/4">
                <button className="absolute left-6 top-8.5 -translate-y-1/2" 
                    onClick={() => setFilter({
                        ...filter,
                        search: search,
                    })}
                >
                    <svg
                        className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                            fill=""
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                            fill=""
                        />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-9 pr-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={search || ""}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setFilter({
                                ...filter,
                                search: search,
                                currentPage: 1,
                            });
                        }
                    }}
                />
            </div>
            {sortBy && <div className="p-3.5 relative xl:w-1/4">
                <div className="flex">
                    <div className="w-full relative z-20 bg-transparent dark:bg-form-input">
                        <select
                            value={filter.sortBy || ""}
                            onChange={(e) => {
                                setFilter({
                                    ...filter,
                                    sortBy: e.target.value,
                                    currentPage: 1,
                                });
                            }}
                            className={`relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${filter.sortBy ? 'text-black dark:text-white' : ''
                                }`}
                        >
                            {sortBy.map((sort) => (
                                <option key={sort.value} value={sort.value} className="text-body dark:text-bodydark">
                                    {sort.label}
                                </option>
                            ))}
                        </select>

                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                        fill=""
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default CommonFilter;