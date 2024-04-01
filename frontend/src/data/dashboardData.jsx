import { FiShoppingBag, } from 'react-icons/fi';
import { FaFileInvoice } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { SlPaperPlane } from "react-icons/sl";
import { HiOutlineFolderOpen } from "react-icons/hi2";

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
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
        name: 'Create Invoice',
        path: 'invoiceCreation',
        icon: <FaFileInvoice></FaFileInvoice>,
      },
      {
        name: 'Validate Invoice',
        path: 'invoiceValidation',
        icon: <GrValidate></GrValidate>,
      },
      {
        name: 'Render Invoice',
        path: 'invoiceRendering',
        icon: <ImFilePicture></ImFilePicture>,
      },
      {
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
