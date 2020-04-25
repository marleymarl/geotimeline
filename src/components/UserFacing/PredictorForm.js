import React, { Component } from 'react';
import { Button, Row, Col, Table, PageHeader, Anchor, Tag, Typography, Form, Select, Cascader, Descriptions } from 'antd';
import 'antd/dist/antd.css';

const { Link } = Anchor;
const { Paragraph } = Typography;
const { Option } = Select;

// <Link href="https://www.medrxiv.org/content/10.1101/2020.04.08.20057794v1.full.pdf" title="NYU Langone" />

const questionAnswer = [
	// { over65: { end: true, value: { predict: 'Admission', sample: '813', admission: '87%'}}, under65: { end: false, path: 'obese' }},
	// { obese: { end: false, path: 'obeseAge'}, notObese: { end: false, path: 'notObeseAge' }},
	// { notObese2044: { end: true, value: { predict: 'No Admission', sample: '977', admission: '13%'}}, notObeseNot2044: { end: false, path: 'notObeseNot2044Male' }},
	// { ObeseOver35: { end: true, value: { predict: 'Admission', sample: '541', admission: '70%'}}, ObeseUnder35: { end: false, path: 'ObeseUnder35Male' }},
	// { ObeseUnder35Female: { end: true, value: { predict: 'No Admission', sample: '59', admission: '70%'}}, ObeseUnder35Male: { end: true, value: { predict: 'Admission', sample: '53', admission: '60%'}}},
	// { notObeseNot2044NotMale: { end: false, path: 'notObeseNot2044NotMaleDiabetes'}, notObeseNot2044Male: { end: false, path: 'notObeseNot2044MaleDiabetes' }},
	// { notObeseNot2044NotMaleNotDiabetes: { end: true, value: { predict: 'No Admission', sample: '359', admission: '23%'}}, notObeseNot2044NotMaleDiabetes: { end: true, value: { predict: 'Admission', sample: '42', admission: '57%'}}},
	// { notObeseNot2044MaleDiabetes: { end: true, value: { predict: 'Admission', sample: '62', admission: '83%'}}, notObeseNot2044MaleNotDiabetes: { end: false, path: 'notObeseNot2044MaleNotDiabetesWhite' }},
	// { notObeseNot2044MaleNotDiabetesWhite: { end: true, value: { predict: 'No Admission', sample: '173', admission: '45%'}}, notObeseNot2044MaleNotDiabetesNotWhite: { end: true, value: { predict: 'Admission', sample: '203', admission: '60%'}}}

	] //structure question answer as an array where each index object represents a question object where each key represents a choice and each value represents path object i.e. if index.key.end == true then output index.key.value

const options = [
	{
		value: 'over65',
		label: 'Over 65 Years Old',
		children: [
			{
				value: {
				 predict: 'Admission', sample: '813', admission: '87%'
				},
				label: 'See Prediction'
			}
		]
	},
	{
		value: 'under65',
		label: 'Under 65 Years Old',
		children: [
			{
				value: 'obese',
				label: 'Obese',
				children: [
					{
						value: 'ObeseOver35',
						label: 'Over 35 Years Old',
						children: [
							{
								value: {
									predict: 'Admission', sample: '541', admission: '70%'
								},
								label: 'See Prediction'
							}
						]
					},
					{
						value: 'ObeseUnder35',
						label: 'Under 35 Years Old',
						children: [
							{
								value: 'ObeseUnder35Female',
								label: 'Female',
								children: [
									{
										value: {
											predict: 'No Admission', sample: '59', admission: '31%'
										},
										label: 'See Prediction'
									}
								]
							},
							{
								value: 'ObeseUnder35Male',
								label: 'Male',
								children: [
									{
										value: {
											predict: 'Admission', sample: '53', admission: '60%'
										},
										label: 'See Prediction'
									}
								]
							}
						]
					}
				]
			}, 
			{
				value: 'notObese',
				label: 'Not Obese',
				children: [
					{
						value: 'notObese2044',
						label: 'Between 20-44 Years Old',
						children: [
							{
								value: {
				 					predict: 'No Admission', sample: '977', admission: '13%'
								},
								label: 'See Prediction'
							}
						]
					},
					{
						value: 'notObeseNot2044',
						label: 'Over 44 Years Old Or Under 20',
						children: [
							{
								value: 'notObeseNot2044Male',
								label: 'Male',
								children: [
									{
										value: 'notObeseNot2044MaleDiabetes',
										label: 'Diabetes',
										children: [
											{
												value: {
													predict: 'Admission', sample: '62', admission: '83%'
												},
												label: 'See Prediction'
											}
										]
									},
									{
										value: 'notObeseNot2044MaleNotDiabetes',
										label: 'No Diabetes',
										children: [
											{
												value: 'notObeseNot2044MaleNotDiabetesWhite',
												label: 'White',
												children: [
													{
														value: {
															predict: 'No Admission', sample: '173', admission: '45%'
														},
														label: 'See Prediction'
													}
												]
											},
											{
												value: 'notObeseNot2044MaleNotDiabetesNotWhite',
												label: 'Not White',
												children: [
													{
														value: {
															predict: 'Admission', sample: '203', admission: '60%'
														},
														label: 'See Prediction'
													}
												]
											}
										]
									}
								]
							},
							{
								value: 'notObeseNot2044NotMale',
								label: 'Female',
								children: [
									{
										value: 'notObeseNot2044NotMaleDiabetes',
										label: 'Diabetes',
										children: [
											{
												value: {
													predict: 'Admission', sample: '42', admission: '57%'
												},
												label: 'See Prediction'
											}
										]
									},
									{
										value: 'notObeseNot2044NotMaleNotDiabetes',
										label: 'No Diabetes',
										children: [
											{
												value: {
													predict: 'No Admission', sample: '359', admission: '23%'
												},
												label: 'See Prediction'
											}
										]
									}
								]
							}

						]
					}
				]
			}
		]
	}
]
const content = (
  <>
    <Paragraph>
      The COVID-19 Predictor asks you a series of questions and depending on your answers makes a prediction based on sample data of what is the maximum risk of hopitilization. 
    </Paragraph>
    <Paragraph>
      The data being used on this form is from a study completed by NYU Langone.
    </Paragraph>
  </>
  )

export default class PredictorForm extends Component {
	state = {
		stageName: 'Awaiting Form Selection',
		prediction: '',
		sampleSize: '',
		percentageAdmissions: ''
	}

	handleAnswerSelect = () => {
		console.log('yo')
	}

	onChange = (value) => {
		
		if(value.length > 0) {
		const predictObject = value[value.length - 1]
		this.setState({ prediction: predictObject.predict, sampleSize: predictObject.sample, percentageAdmissions: predictObject.admission, stageName: 'Prediction Complete' })
		} else {
			this.setState({ prediction: '', sampleSize: '', percentageAdmissions: '', stageName: 'Awaiting Form Selection' })
		}	
	}

	
	render() {
		const { prediction, sampleSize, percentageAdmissions } = this.state;

		return (
			
			<div>
			<PageHeader
    			title="Predictor"
    			className="site-page-header"
    			subTitle="Of Maximum Risk of COVID-19 Hospitalization"
    			tags={<Tag color="blue">{this.state.stageName}</Tag>}
    
    			
    
  			>
    		
      		{content}
 			<Form className="cascader-form-wrapper">
  				<Cascader options={options} onChange={this.onChange} placeholder="Please select to start" />
  				
  			</Form>
  			<br />
  			<Descriptions title="Prediction Information">
  				<Descriptions.Item label="Prediction">{prediction}</Descriptions.Item>
  				<Descriptions.Item label="Sample Size">{sampleSize}</Descriptions.Item>
  				<Descriptions.Item label="Admissions %">{percentageAdmissions}</Descriptions.Item>

  			</Descriptions>
  			</PageHeader>
  			
  			
  			
  			</div>

			)
	}
}