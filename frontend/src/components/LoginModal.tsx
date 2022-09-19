import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, FormEventHandler, useRef } from "react";
import { login, LoginData } from "../lib/auth";

export default function LoginModal() {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoaing] = useState(false);
  let [error, setError] = useState("");
  const ref = useRef<LoginData>({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoaing(true);
    login(ref.current)
      .then((res) => {
        const data = res.data;
        sessionStorage.setItem("jwt", data.jwt);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setLoaing(false);
        window.location.reload();
      })
      .catch((err) => {
        const res = err.response.data;
        setError(res.error ? res.error.message : "请稍后再试");
        setLoaing(false);
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-3xl px-5 py-2 bg-orange-500  font-semibold text-white  border border-orange-500"
      >
        登录
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    登录
                  </Dialog.Title>
                  <section className="text-gray-500 pt-5">
                    {error && (
                      <div className="p-3 border border-orange-500 text-orange-500 rounded bg-orange-50 mb-5 flex items-center">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{error}</span>
                      </div>
                    )}
                    <form onSubmit={onSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label>邮箱:</label>
                        <input
                          className="border px-3 py-2 w-full rounded"
                          type="email"
                          name="email"
                          onChange={(e) =>
                            (ref.current.identifier = e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label>密码:</label>
                        <input
                          className="border px-3 py-2 w-full rounded"
                          type="password"
                          name="password"
                          required
                          onChange={(e) =>
                            (ref.current.password = e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <a href="">
                          <small>忘记密码?</small>
                        </a>
                      </div>

                      <div className="space-x-3 text-center">
                        <button
                          className="rounded-3xl px-5 py-2 bg-orange-500  font-semibold text-white  border border-orange-500"
                          color="primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "登录中..." : "登录"}
                        </button>
                        <button
                          type="button"
                          className="rounded-3xl px-5 py-2  font-semibold text-orange-500  border border-orange-500"
                          onClick={closeModal}
                        >
                          取消
                        </button>
                      </div>
                    </form>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
