import CourseBooking from '../../components/CourseBooking';

const CustomerDashboard = () => {
  return (
    <>
      <h1 className='text-2xl text-center m-auto my-10'>Customer Dashboard</h1>
      <section>
        <CourseBooking />
      </section>
    </>
  );
};

export default CustomerDashboard;
