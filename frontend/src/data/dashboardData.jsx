import { FiShoppingBag, } from 'react-icons/fi';
import { FaFileInvoice } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { SlPaperPlane } from "react-icons/sl";
import { TbFileUpload } from "react-icons/tb";
import { HiOutlineFolderOpen } from "react-icons/hi2";

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        id: 0,
        name: 'Dashboard',
        path: 'dashboard',
        icon: <FiShoppingBag></FiShoppingBag>,
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        id: 1,
        name: 'Create Invoice',
        path: 'invoiceCreation',
        icon: <FaFileInvoice></FaFileInvoice>,
        subMenus: [
          {
            name: 'Upload Documents',
            path: 'invoiceCreation/uploadDocument',
            icon: <TbFileUpload></TbFileUpload>
          }
        ],
      },
      {
        id: 2,
        name: 'Validate Invoice',
        path: 'invoiceValidation',
        icon: <GrValidate></GrValidate>,
      },
      {
        id: 3,
        name: 'Render Invoice',
        path: 'invoiceRendering',
        icon: <ImFilePicture></ImFilePicture>,
      },
      {
        id: 4,
        name: 'Sending Invoice',
        path: 'invoiceSending',
        icon: <SlPaperPlane></SlPaperPlane>
      },
      {
        name: 'Receiving Invoice',
        path: 'invoiceReceiving',
        icon: <HiOutlineFolderOpen />,
      }
    ],
  },
];

export const cardData = [
  {
    icon: <FiShoppingBag />,
    title: 'CARD 1',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <FaFileInvoice />,
    title: 'CARD 2',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
  {
    icon: <GrValidate />,
    title: 'CARD 3',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
  },
  {
    icon: <ImFilePicture />,
    title: 'CARD 4',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
];