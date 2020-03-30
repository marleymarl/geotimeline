# GeoTime - Map Data Input For Confirmed Case Location History

This is a map-based React data input component that will output historical geo-timeline information for confirmed cases like what's available for Korea, Taiwan and Israel, but for any geo. 

This project won the [Supply Chain and Medical Logistics](https://devpost.com/software/geotime-map-data-input-for-confirmed-case-location-history) prize at the [EndCoronavirus.org](https://www.endcoronavirus.org/) Hackathon on March 21-22, 2020.

This repository represents what is currently on the demo site for [GeoTime](https://geotime.gregmarlin.com). 

If you would like to contribute to this project, volunteer at our project listing on [helpwithcovid.com](https://helpwithcovid.com/projects/245-geotime-data-input-of-historical-footprints-of-confirmed-cases-with-lat-lon-timestamp).

The inspiration for this project was to provide an easy data entry layer so anyone can capture the type of data that Korea, Taiwan and Israel have in the [Data Science for Covid19 Rep](https://github.com/jihoo-kim/Data-Science-for-COVID-19/blob/master/dataset/Patient/PatientRoute.csv). This data is needed for apps that can compare movements of confirmed cases with that of app users so users could know if they potentially came into contact in the past and also to route plan in the future to avoid those areas. This data can also be used for clustering analysis and other type of critical data analysis and risk mitigation strategies. 

Greg Marlin wrote a linked post that described a [rough spec](https://www.linkedin.com/posts/activity-6646431967925583873-P6hF) for these types of apps. From there is was clear that greatest need was for jurisdications outside of Korea, Taiwan and Isreal to first get this data. 

Application developers can freely use this open source software in their own apps to facilitate this data capture efforts, either by cloning the repo or importing using NPM. Organizations that wish to use a version of this standalone demo app as part of a dedicated application, they are welcome to do so as well. The sofware is completely MIT open sourced. If any party would like help to integrate this component or demo application and for any other strategic partnership discussion, please don't hesitate to get in touch on [LinkedIn](https://www.linkedin.com/in/greg-marlin-8a4528a/) or through our project listing on [helpwithcovid.com](https://helpwithcovid.com/projects/245-geotime-data-input-of-historical-footprints-of-confirmed-cases-with-lat-lon-timestamp).

We ask that in all cases the data should be shared openly in a patient-anonymized way for use and analysis by application developers, including those making analysis dashboards and location-based mobile applications such as those described in the rough spec. We will shortly be providing an API URL for those need somewhere to save this information too and we will be saving that information to an open source repository on a daily bais. 



### Cloning the repository

```bash
git clone https://github.com/marleymarl/geotime
```

### Installing dependencies and starting demo

```bash
cd geotime && npm install
```

```bash
npm start
```

This project makes heavy use of [react-google-maps](https://www.npmjs.com/package/react-google-maps) and [Ant-Design](https://ant.design/).

### Importing as an NPM Module

We are currently working on making this React component available on NPM for easy install/import. The NPM link will be here when it is available. In the meantime you can view the status of that [here](https://github.com/marleymarl/geotime-npm).

### Copying Component

The main components you want are: 

* the wrapper component GeoTimeline.js which is found in the ./src/components/GeoTimeline/ folder and which has a function handlePatientIdSubmit that is used in the child UpFrontForm component to pass a patientId from child to parent. The GeoTimeline component renders the UpFrontForm if no patientId is in its state and renders the MapContainer if it does. If you have no need for an UpFrontForm then you can use the MapContainer directly, however you will need some other method then of passing a patientId as props into the MapContainer component.
* The UpFrontForm.js component mentioned above which is found in ./src/ folder. 
* The MapContainer.js is found in the ./src/ folder and can be used on its own if copied into another project as its own component. It takes in a patientId and GoogleMaps API key as props.  

### Getting access to the data

On the demo site you have access to 'Save to CSV' button to download a csv file of the patient timeline collected with the map interface. In the app you can customize a button within MapContainer.js to save the state of the footPrints array to a custom destination. We will be adding custom destination as a prop on the component in the near future. 

### What's next

We are seeking partnerships with app developers and testing jurisdictions to facilitate as much critical timeline data collection and sharing as possible as quickly as possible. 

For Roadmap, see Issues, as well check back at this section. 

To volunteer to add to this project, please see our [Volunteer Sign-up Page](https://helpwithcovid.com/projects/245-geotime-data-input-of-historical-footprints-of-confirmed-cases-with-lat-lon-timestamp), or feel free to fork this repo and make a pull request. 

### Acknowledgements

We'd like to recognize the great efforts of the team at [EndCoronavirus.org](https://www.endcoronavirus.org/) for putting on such a great hackathon on such short notice. 

### Contributors

@marleymarl
@maxbildner
@drd161
@banazari
@heldersepu
@alec-simplr
