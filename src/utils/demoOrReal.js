const defaultRealOrDemoValue = 'demo'
export const updateRealOrDemo = value => localStorage.setItem('geotimeline.demoOrReal', value);
export const getRealOrDemo = () => localStorage.getItem('geotimeline.demoOrReal') || defaultRealOrDemoValue;