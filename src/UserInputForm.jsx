import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function UserInputForm({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialData });
  const navigate = useNavigate();

  const submitHandler = (data) => {
    onSubmit(data);
    navigate('/results');
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Enter Your Profile Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="current_role" className="block mb-1 font-medium">Current Role</label>
          <input
            id="current_role"
            {...register('current_role', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
            aria-invalid={errors.current_role ? 'true' : 'false'}
          />
          {errors.current_role && <p className="text-red-500 text-sm">{errors.current_role.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="experience_years" className="block mb-1 font-medium">Experience (Years)</label>
          <input
            id="experience_years"
            type="number"
            {...register('experience_years', { required: 'Required', min: 0 })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.experience_years && <p className="text-red-500 text-sm">{errors.experience_years.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="current_salary" className="block mb-1 font-medium">Current Salary</label>
          <input
            id="current_salary"
            type="number"
            {...register('current_salary', { required: 'Required', min: 0 })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.current_salary && <p className="text-red-500 text-sm">{errors.current_salary.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1 font-medium">Location</label>
          <input
            id="location"
            {...register('location', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="education" className="block mb-1 font-medium">Education</label>
          <input
            id="education"
            {...register('education', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Goals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="salary_target" className="block mb-1 font-medium">Salary Target</label>
          <input
            id="salary_target"
            {...register('goals.salary_target', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.goals?.salary_target && <p className="text-red-500 text-sm">{errors.goals.salary_target.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="work_preference" className="block mb-1 font-medium">Work Preference</label>
          <input
            id="work_preference"
            {...register('goals.work_preference', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.goals?.work_preference && <p className="text-red-500 text-sm">{errors.goals.work_preference.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="career_pivot" className="block mb-1 font-medium">Career Pivot</label>
          <input
            id="career_pivot"
            {...register('goals.career_pivot', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.goals?.career_pivot && <p className="text-red-500 text-sm">{errors.goals.career_pivot.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="concerns" className="block mb-1 font-medium">Concerns</label>
          <input
            id="concerns"
            {...register('goals.concerns', { required: 'Required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.goals?.concerns && <p className="text-red-500 text-sm">{errors.goals.concerns.message}</p>}
        </div>
      </div>
      
      <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
        Get Personalized Recommendations
      </button>
    </form>
  );
}

export default UserInputForm;
