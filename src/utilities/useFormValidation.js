import { useEffect } from 'react';

const useFormValidation = () => {
  useEffect(() => {
    // Function to add validation styles to forms
    const validateForms = () => {
      const forms = document.querySelectorAll('.needs-validation');
      
      Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });

      // Real-time validation
      document.querySelectorAll('.needs-validation .form-control').forEach((input) => {
        input.addEventListener('input', () => {
          if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
          }
        });
      });
    };

    validateForms();
  }, []);
};

export default useFormValidation;