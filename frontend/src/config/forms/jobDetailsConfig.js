export const jobDetailsConfig = {
  // Header section configuration
  header: {
    title: {
      key: 'role', // fallback to 'title'
      fallbackKey: 'title',
      defaultValue: 'Untitled Position'
    },
    subtitle: {
      key: 'companyName',
      fallbackKey: 'company',
      defaultValue: 'Company Details TBA'
    },
    icon: 'Building2'
  },

  // Quick info grid configuration
  quickInfo: [
    {
      label: 'Location',
      key: 'location',
      icon: 'MapPin',
      defaultValue: 'Not Specified',
      formatter: (value) => value
    },
    {
      label: 'Salary',
      key: 'salary',
      icon: 'DollarSign',
      defaultValue: 'Not Disclosed',
      formatter: (value) => {
        // Handle both formatted strings (from state) and numbers (from API)
        if (typeof value === 'string' && value.includes('₹')) return value;
        if (typeof value === 'number') return `₹${value.toLocaleString()}`;
        return 'Not Disclosed';
      }
    },
    {
      label: 'Environment',
      key: 'jobType',
      icon: 'Briefcase',
      defaultValue: 'Full-Time',
      formatter: (value) => value || 'Full-Time'
    },
    {
      label: 'Deadline',
      key: 'deadline',
      icon: 'Calendar',
      defaultValue: 'Open Until Filled',
      formatter: (value) => {
        if (!value) return 'Open Until Filled';
        // Handle date strings like "2026-04-23"
        try {
          const date = new Date(value);
          return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        } catch {
          return value; // fallback to original value if parsing fails
        }
      }
    }
  ],

  // Skills section configuration
  skills: {
    title: 'Required Skills',
    key: 'skills',
    icon: 'List',
    fallbackKey: 'tags',    
    emptyMessage: 'No specific skills listed.',
    defaultValue: []
  },

  // Description section configuration
  description: {
    title: 'Job Description',
    key: 'description',
    defaultValue: 'No description provided.',
    preserveFormatting: true // for whitespace-pre-wrap
  }
};

// Helper function to get nested value from job object
export const getJobFieldValue = (job, config) => {
  if (!job) return config.defaultValue;

  // Try primary key
  let value = job[config.key];

  // Try fallback key if primary doesn't exist
  if (value === undefined && config.fallbackKey) {
    value = job[config.fallbackKey];
  }

  // Apply formatter if exists
  if (config.formatter && value !== undefined) {
    value = config.formatter(value);
  }

  return value !== undefined ? value : config.defaultValue;
};