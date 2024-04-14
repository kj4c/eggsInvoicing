import { FiShoppingBag, } from 'react-icons/fi';
import { FaFileInvoice } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { SlPaperPlane } from "react-icons/sl";
import { TbFileUpload } from "react-icons/tb";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { SlPencil } from "react-icons/sl";

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
        name: 'Create',
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
        name: 'Validate',
        path: 'invoiceValidation',
        icon: <GrValidate></GrValidate>,
      },
      {
        id: 3,
        name: 'Render',
        path: 'invoiceRendering',
        icon: <ImFilePicture></ImFilePicture>,
      },
      {
        id: 4,
        name: 'Compose',
        path: 'invoiceSending',
        icon: <SlPencil></SlPencil>,
        subMenus: [
          {
            name: 'XML',
            path: 'invoiceInputMultipleXML',
          }
        ],
      },
      {
        id:5,
        name: 'Received',
        path: 'invoiceReceiving',
        icon: <HiOutlineFolderOpen />,
      },
      {
        id: 6,
        name: 'Sent',
        path: 'invoicesSent',
        icon: <SlPaperPlane></SlPaperPlane>,
      }
    ],
  },
];
