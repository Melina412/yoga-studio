import NavBar from '../../components/NavBar'; // nur zum testen der links, später kommt hier anderes menü hin
import EventForm from '../../components/EventForm';

const Admin = () => {
  return (
    <>
      <NavBar />
      <h1>Admin Dashboard</h1>
      <EventForm />
    </>
  );
};

export default Admin;
