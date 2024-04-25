import { FiShoppingBag } from 'react-icons/fi';
import { FaFileInvoice } from 'react-icons/fa6';
import { GrValidate } from 'react-icons/gr';
import { ImFilePicture } from 'react-icons/im';
import { SlPaperPlane } from 'react-icons/sl';
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineTeam } from "react-icons/ai";
import { HiOutlineFolderOpen } from 'react-icons/hi2';
import { SlPencil } from 'react-icons/sl';
import { FaInbox } from "react-icons/fa6";
import { GiTeamDowngrade } from "react-icons/gi";
import { GiTeamIdea } from "react-icons/gi";

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
            name: 'XML',
            path: 'invoiceInputMultiple',
            icon: <TbFileUpload></TbFileUpload>,
          },
          {
            id: 402,
            name: 'JSON',
            path: 'invoiceInputMultipleJson',
            icon: <TbFileUpload></TbFileUpload>,
          },
          {
            id: 403,
            name: 'Group Email',
            path: 'sendMultipleEmail',
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
        subMenus: [
          {
            id: 701,
            name: 'Team Info',
            path: 'team/info',
            icon: <AiOutlineTeam></AiOutlineTeam>,
          }, 
          {
            id: 701,
            name: 'Join Team',
            path: 'team/join',
            icon: <GiTeamDowngrade />,
          }, 
          {
            id: 702,
            name: 'Create Team',
            path: 'teamcreate',
            icon: <GiTeamIdea/>,
          },
          {
            id: 703,
            name: 'Team Send',
            path: 'teamsend',
            icon: <SlPaperPlane></SlPaperPlane>,
          },
          {
            id: 704,
            name: 'Team Inbox',
            path: 'teaminbox',
            icon: <FaInbox />,
          },
        ],
      },
    ],
  },
];