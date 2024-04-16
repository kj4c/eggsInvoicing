import { FaFileInvoice } from 'react-icons/fa';
import { GrValidate } from 'react-icons/gr';
import { ImFilePicture } from 'react-icons/im';
import { SlPaperPlane } from 'react-icons/sl';
import { HiOutlineFolderOpen } from 'react-icons/hi2';
import { MdOutlineSecurity } from 'react-icons/md';

export const features = [
  {
    id: '0',
    title: 'Create Invoices with Ease',
    text: 'Generate professional invoices through a user-friendly GUI form or optionally upload a JSON or CSV file.',
    backgroundUrl: './src/assets/features/card-1.svg',
    icon: <FaFileInvoice />,
    url: '#create',
    colour: '#5ee1ea',
  },
  {
    id: '1',
    title: 'Efficient Digital Validation',
    text: 'Ensure compliance and eliminate errors with automated validation against PEPPOL and syntax rules.',
    backgroundUrl: './src/assets/features/card-2.svg',
    icon: <GrValidate />,
    light: true,
    url: '#rendervalidate',
    colour: '#FFC876',
  },
  {
    id: '2',
    title: 'Beautifully Rendered Invoices',
    text: 'Receive XML invoices and instantly generate professionally formatted invoices with a click.',
    backgroundUrl: './src/assets/features/card-3.svg',
    icon: <ImFilePicture />,
    url: '#rendervalidate',
    colour: '#AC6AFF',
  },
  {
    id: '3',
    title: 'Effortless Emailing of Invoices',
    text: 'Send XML or JSON invoices via email, individually or in bulk, with ease and convenience - all in a few clicks.',
    backgroundUrl: './src/assets/features/card-4.svg',
    icon: <SlPaperPlane />,
    light: true,
    url: '#sendreceive',
    colour: '#7ADB78',
  },
  {
    id: '4',
    title: 'Stay Organized with Our Invoice Management Tools',
    text: `View and download all your received invoices conveniently. Use our fetching feature to search invoices by ID, date, or date range for efficient organization. We've got everything you need for organized invoicing.`,
    backgroundUrl: './src/assets/features/card-5.svg',
    icon: <HiOutlineFolderOpen />,
    url: '#sendreceive',
    colour: '#FF776F',
  },
  {
    id: '5',
    title: `Elevate Your Organization's Collaborative Potential`,
    text: 'Eggs Invoices provides a centralized platform for organizations to manage, track, and collaborate on invoices. Its features include team creation, member invitation, and shared invoice views, all designed to streamline collaboration and enhance efficiency. ',
    backgroundUrl: './src/assets/features/card-6.svg',
    icon: <MdOutlineSecurity />,
    url: '#teams',
    colour: '#ea5ed0',
  },
];
