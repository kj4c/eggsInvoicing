import { FiShoppingBag } from 'react-icons/fi';
import { FaFileInvoice } from 'react-icons/fa6';
import { GrValidate } from 'react-icons/gr';
import { ImFilePicture } from 'react-icons/im';
import { SlPaperPlane } from 'react-icons/sl';
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineTeam } from "react-icons/ai";
import { HiOutlineFolderOpen } from 'react-icons/hi2';
import { SlPencil } from 'react-icons/sl';

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
            id: 101,
            name: 'Upload Documents',
            path: 'invoiceCreation/uploadDocument',
            icon: <TbFileUpload></TbFileUpload>,
          },
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
        path: '',
        icon: <SlPencil></SlPencil>,
        subMenus: [
          {
            id: 401,
            name: 'XML Multiple',
            path: 'invoiceInputMultiple',
            icon: <TbFileUpload></TbFileUpload>,
          },
          {
            id: 402,
            name: 'JSON Multiple',
            path: 'invoiceInputMultipleJson',
            icon: <TbFileUpload></TbFileUpload>,
          },
          {
            id: 403,
            name: 'Send Multiple',
            path: 'invoiceInputMultipleJson1',
            icon: <TbFileUpload></TbFileUpload>,
          },
        ],
      },
      {
        id: 5,
        name: 'Received',
        path: 'invoiceReceiving',
        icon: <HiOutlineFolderOpen />,
      },
      {
        id: 6,
        name: 'Sent',
        path: 'invoicesSent',
        icon: <SlPaperPlane></SlPaperPlane>,
      },
      {
        id: 7,
        name: 'Team',
        path: 'team',
        icon: <AiOutlineTeam></AiOutlineTeam>,
      },
    ],
  },
];