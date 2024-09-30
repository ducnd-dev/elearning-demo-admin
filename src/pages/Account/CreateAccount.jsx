import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../api/authApi';
import { Spin } from 'antd';

const defaultData = {
    "username": "",
    "password": "",
    "passwordConfirmation": "",
    "role": "ADMIN"
}

const CreateAccount = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(defaultData);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        if (data.role === "" || data.username === "" || data.password === "" || data.passwordConfirmation === "") {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (data.password !== data.passwordConfirmation) {
            toast.error("Password and password confirmation do not match");
            setLoading(false);
            return;
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            await api.register(data);
            navigate('/accounts');
        } catch (error) {
            toast.error(error.response.data.message);
            setData(defaultData);
        }
        
        setLoading(false);
    }
    return (
        <>
            <ToastContainer />
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Tạo mới tài khoản" prePage="Danh sách tài khoản" preLink="/accounts"/>
                <Spin tip="Đang tải..." spinning={loading}>
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-5 xl:col-span-3">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Thông tin tài khoản
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <div>
                                        <div className="mb-5.5">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="Username"
                                            >
                                                Username

                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="Username"
                                                id="Username"
                                                placeholder='Username'
                                                value={data.username}
                                                onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-black dark:text-white">
                                                Quyền
                                            </label>

                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.8">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                                fill="#637381"
                                                            ></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                                fill="#637381"
                                                            ></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                                fill="#637381"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </span>

                                                <select
                                                    value={data.role}
                                                    onChange={(e) => { setData({ ...data, role: e.target.value }) }}
                                                    required
                                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${data.role ? 'text-black dark:text-white' : ''}`}
                                                >
                                                    <option value="ADMIN" className="text-body dark:text-bodydark">
                                                        Admin
                                                    </option>
                                                    <option value="SUPERADMIN" className="text-body dark:text-bodydark">
                                                        Super Admin
                                                    </option>
                                                </select>

                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                    <svg
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
                                                                fill="#637381"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="password"
                                            >
                                                Mật khẩu
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>

                                                <input
                                                    className="w-full rounded border border-stroke bg-white py-3 px-11.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder='Mật khẩu'
                                                    value={data.password}
                                                    required
                                                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="passwordConfirmation"
                                            >
                                                Xác nhận mật khẩu
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>

                                                <input
                                                    className="w-full rounded border border-stroke bg-white py-3 px-11.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="password"
                                                    name="passwordConfirmation"
                                                    id="passwordConfirmation"
                                                    placeholder='Xác nhận mật khẩu'
                                                    value={data.passwordConfirmation}
                                                    required
                                                    onChange={(e) => { setData({ ...data, passwordConfirmation: e.target.value }) }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4.5">
                                            <button
                                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="submit"
                                                onClick={() => navigate('/accounts')}
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </>
    );
};

export default CreateAccount;