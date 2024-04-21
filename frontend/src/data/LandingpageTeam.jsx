import teamInfo from '../assets/LandingpageTeams/teamInfo.png';
import teamSend from '../assets/LandingpageTeams/teamSend.png';
import teamCreate from '../assets/LandingpageTeams/teamCreate.png';
import teamJoin from '../assets/LandingpageTeams/teamJoin.png';
import teamInbox from '../assets/LandingpageTeams/teamInbox.png';
import teamBanner from '../assets/LandingpageTeams/teamBanner.png';

export const teamsData = [
  {
    id: '0',
    title: 'Team Organisations Management',
    text: `Easily set up teams, give out roles, and add new members with a simple passcode. Everyone can work on invoices together and see updates in real time improving organisation and efficiency. It's simple, smooth, and just what modern businesses need.
    Facilitate seamless collaboration and growth within the team by using our`,
    date: 'May 2023',
    status: 'progress',
    imageUrl: teamBanner,
    colorful: true,
  },
  {
    id: '1',
    title: `Team Info Panel`,
    text: ` Empowering individuals to excel together towards a common goal. View a comprehensive list of team members, extend invitations to new team members. Leave the team with a click of a button.`,
    date: 'May 2023',
    status: 'done',
    imageUrl: teamInfo,
    colorful: true,
  },
  {
    id: '2',
    title: `Create Teams`,
    text: `Harnessing collective intelligence by creating your own team! When you create a teamm, provide a team name and team email and you will be given a password for others to join. Assign roles, and manage permissions to ensure that the right people have access to the right information at the right time. Make sure you remember the password!`,
    date: 'May 2023',
    status: 'progress',
    imageUrl: teamCreate,
    colorful: true,
  },
  {
    id: '3',
    title: `Join Teams`,
    text: `Fostering synergy and innovation through effective teamwork. Seamlessly invite new users to the platform through email invitations, making it easy to onboard new team members or collaborate with external stakeholders.`,
    date: 'May 2023',
    status: 'done',
    imageUrl: teamJoin,
    colorful: true,
  },
  {
    id: '4',
    title: `Centralise Message Delivery`,
    text: `Utilize your team's designated email address to seamlessly dispatch invoices on behalf of your team, ensuring a professional and unified representation in all business transactions.`,
    date: 'May 2023',
    status: 'progress',
    imageUrl: teamSend,
    colorful: true,
  },
  {
    id: '5',
    title: 'Team Communication Inbox',
    text: `Centralized email account dedicated to receiving and managing all correspondence related to the team's activities, communications, and transactions. Teams can view and edit invoice details collaboratively in real-time, ensuring that all updates are synchronised across the board. This prevents duplicate efforts and keeps everyone on the same page`,
    date: 'May 2023',
    status: 'progress',
    imageUrl: teamInbox,
    colorful: true,
  },
];
