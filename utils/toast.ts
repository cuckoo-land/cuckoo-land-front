import Swal from 'sweetalert2';

export const handleToast = (icon: 'warning' | 'error' | 'success' | 'info' | 'question', title: string) => {
  Toast.fire({
    icon,
    title,
  });
};

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
