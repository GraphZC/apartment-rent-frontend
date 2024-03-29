"use client";
import { UserRole } from "@/enum/UserRole";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  HomeModernIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";

const guestNavigation = [
  { name: "หน้าหลัก", href: "/home", current: true },
  { name: "แผนที่", href: "/map", current: false },
  { name: "ข่าวสาร", href: "/news", current: false },
  { name: "ติดต่อเรา", href: "/contact", current: false },
];

const memberNavigation = [
  { name: "หน้าหลัก", href: "/home", current: true },
  { name: "จองห้อง", href: "/reserve", current: false },
  { name: "แผนที่", href: "/map", current: false },
  { name: 'สาธารณูปโภค', href: '/utility', current: false },
  { name: "ข่าวสาร", href: "/news", current: false },
  { name: "ติดต่อเรา", href: "/contact", current: false },
];

const adminNavigation = [
  ...memberNavigation,
  { name: "ระบบจัดการ", href: "/admin/dashboard", current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  
  const [chat, setChat] = useState(false);
  
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div className="bg-gray-900 h-16"></div>
  }

  let navigation = guestNavigation;
  
  switch (session?.user?.role) {
    case UserRole.USER:
      navigation = memberNavigation;
      break;
    case UserRole.ADMIN:
      navigation = adminNavigation;
      break;
    default:
      navigation = guestNavigation;
      break;
  }
  
  
  const ChatBox = () => {
    return (
      <div className="relative">
        <button
          className="fixed bottom-5 right-5  text-gray-900 bg-gray-200 p-4 hover:scale-110 hover:duration-300 rounded-full"
          onClick={() => window.location.href = 'https://www.facebook.com/peerakorn.laksanasut.7'}
        >
          <ChatBubbleLeftRightIcon className="h-10 w-10" aria-hidden="true" />
        </button>
      </div>
    );
  };

  const ChatPop = () => {
    return (
      <div className="relative">
        <div className="fixed bottom-5 right-5 z-50 text-gray-900 ">
          <Card className="w-96 shadow-sm border-gray-200 border-2">
            <CardBody className="">
              <div className="grid grid-cols-2 gap-4 ">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Chat Box
                </Typography>
                <button
                  className="flex justify-end"
                  onClick={() => window.location.href = 'https://www.facebook.com/peerakorn.laksanasut.7'}
                >
                  <XCircleIcon className="h-7 w-7" aria-hidden="true" />
                </button>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="">
                <Textarea label="input text" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };

  const Modal = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl  font-semibold leading-6 text-gray-900"
                        >
                          การแจ้งเตือน
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-lg text-gray-500">
                            ขอแจ้งผู้พักอาศัยทุกท่านเรื่องการฉีดพ่นยุง <br />
                            ในวันที่ 20 ตุลาคม 2566 !!!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      ปิด
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };
  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          {chat ? <ChatPop /> : ""}
          <ChatBox />
          <Modal />
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <HomeModernIcon
                    className="h-6 w-6 text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href == pathname ||
                            (pathname == "/" && item.href == "/Home")
                            ? " text-white bg-gray-800"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-md font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              { status == "authenticated" ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon
                        className="block h-8 w-8"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-2 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            โปรไฟล์
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            ออกจากระบบ
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> 
                : 
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link 
                  href="/login" 
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  สมัครสมาชิก
                </Link>
              </div>
              }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
