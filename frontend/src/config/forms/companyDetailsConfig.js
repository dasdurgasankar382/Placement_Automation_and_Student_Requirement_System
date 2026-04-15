/**
 * Configuration for Company Details view
 */
export const companyDetailsConfig = {
  // Header section
  header: {
    title: {
      key: 'name',
      defaultValue: 'Unknown Company'
    },
    icon: 'Building2'
  },

  // Fields for the quick info grid
  quickInfo: [
    {
      label: 'Location',
      key: 'location',
      icon: 'MapPin',
      defaultValue: 'Not Specified'
    },
    {
      label: 'Website',
      key: 'website',
      icon: 'Globe',
      defaultValue: 'None',
      isLink: true,
      formatter: (val) => val?.replace(/^https?:\/\//, '')
    },
    {
      label: 'Contact',
      key: 'phone',
      icon: 'Phone',
      defaultValue: 'Not Provided'
    }
  ],

  // Description section
  description: {
    title: 'About Company',
    key: 'description',
    icon: 'Info',
    defaultValue: 'No description provided.'
  }
};

/**
 * Helper to get value from company object based on config
 */
export const getCompanyFieldValue = (company, config) => {
  if (!company) return config.defaultValue;
  
  let value = company[config.key];
  
  if (config.formatter && value) {
    value = config.formatter(value);
  }
  
  return value || config.defaultValue;
};
