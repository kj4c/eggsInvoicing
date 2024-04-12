import featureImage2 from '../assets/features/image-2.png';

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
    imageUrl: featureImage2,
    url: '#create',
    colour: '#5ee1ea',
  },
  {
    id: '1',
    title: 'Efficient Digital Validation',
    text: 'Ensure compliance and eliminate errors with automated validation against PEPPOL and syntax rules.',
    backgroundUrl: './src/assets/features/card-2.svg',
    icon: <GrValidate />,
    imageUrl: featureImage2,
    light: true,
    url: '#validate',
    colour: '#FFC876',
  },
  {
    id: '2',
    title: 'Beautifully Rendered Invoices',
    text: 'Receive XML invoices and instantly generate professionally formatted invoices with a click.',
    backgroundUrl: './src/assets/features/card-3.svg',
    icon: <ImFilePicture />,
    imageUrl: featureImage2,
    url: '#render',
    colour: '#AC6AFF',
  },
  {
    id: '3',
    title: 'Effortless Emailing of Invoices',
    text: 'Send XML or JSON invoices via email, individually or in bulk, with ease and convenience - all in a few clicks.',
    backgroundUrl: './src/assets/features/card-4.svg',
    icon: <SlPaperPlane />,
    imageUrl: featureImage2,
    light: true,
    url: '#send',
    colour: '#7ADB78',
  },
  {
    id: '4',
    title: 'Stay Organized with Our Invoice Management Tools',
    text: `View and download all your received invoices conveniently. Use our fetching feature to search invoices by ID, date, or date range for efficient organization. We've got everything you need for organized invoicing.`,
    backgroundUrl: './src/assets/features/card-5.svg',
    icon: <HiOutlineFolderOpen />,
    imageUrl: featureImage2,
    url: '#receive',
    colour: '#FF776F',
  },
  {
    id: '5',
    title: 'Protect Your Invoices with Robust Security Measures',
    text: 'We prioritize the security of your invoices. Our platform employs robust security measures to ensure that your sensitive information is protected at all times.',
    backgroundUrl: './src/assets/features/card-6.svg',
    icon: <MdOutlineSecurity />,
    imageUrl: featureImage2,
    url: '#something',
    colour: '#ea5ed0',
  },
];
