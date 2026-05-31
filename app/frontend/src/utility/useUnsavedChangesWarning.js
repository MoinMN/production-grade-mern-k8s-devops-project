import { useEffect } from 'react';

const useUnsavedChangesWarning = (isDirty) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ''; // Display confirmation dialog in the browser
      }
    };

    const handleNavigation = (event) => {
      if (isDirty) {
        const confirmNavigation = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmNavigation) {
          event.preventDefault(); // Prevent the navigation
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isDirty]);
};

export default useUnsavedChangesWarning;
