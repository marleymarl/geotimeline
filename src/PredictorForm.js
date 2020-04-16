import React, { Component } from 'react';
import { Button, Row, Col, Table, PageHeader, Anchor, Tag, Typography, Form, Select } from 'antd';

const { Link } = Anchor;
const { Paragraph } = Typography;
const { Option } = Select;

// <Link href="https://www.medrxiv.org/content/10.1101/2020.04.08.20057794v1.full.pdf" title="NYU Langone" />

const questionAnswer = [
	{ over65: { end: true, value: { predict: 'Admission', sample: '813', admission: '87%'}}, under65: { end: false, path: 'obese' }},
	{ obese: { end: false, path: 'obeseAge'}, notObese: { end: false, path: 'notObeseAge' }},
	{ notObese2044: { end: true, value: { predict: 'No Admission', sample: '977', admission: '13%'}}, notObeseNot2044: { end: false, path: 'notObeseNot2044Male' }},
	{ ObeseOver35: { end: true, value: { predict: 'Admission', sample: '541', admission: '70%'}}, ObeseUnder35: { end: false, path: 'ObeseUnder35Male' }},
	{ ObeseUnder35Female: { end: true, value: { predict: 'No Admission', sample: '59', admission: '70%'}}, ObeseUnder35Male: { end: true, value: { predict: 'Admission', sample: '53', admission: '60%'}}},
	{ notObeseNot2044NotMale: { end: false, path: 'notObeseNot2044NotMaleDiabetes'}, notObeseNot2044Male: { end: false, path: 'notObeseNot2044MaleDiabetes' }},
	{ notObeseNot2044NotMaleNotDiabetes: { end: true, value: { predict: 'No Admission', sample: '359', admission: '23%'}}, notObeseNot2044NotMaleDiabetes: { end: true, value: { predict: 'Admission', sample: '42', admission: '57%'}}},
	{ notObeseNot2044MaleDiabetes: { end: true, value: { predict: 'Admission', sample: '62', admission: '83%'}}, notObeseNot2044MaleNotDiabetes: { end: false, path: 'notObeseNot2044MaleNotDiabetesWhite' }},
	{ notObeseNot2044MaleNotDiabetesWhite: { end: true, value: { predict: 'No Admission', sample: '173', admission: '45%'}}, notObeseNot2044MaleNotDiabetesNotWhite: { end: true, value: { predict: 'Admission', sample: '203', admission: '60%'}}}

	] //structure question answer as an array where each index object represents a question object where each key represents a choice and each value represents path object i.e. if index.key.end == true then output index.key.value

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
		stage: 2,
		stageName: 'Second Question',
		answeredArray: [
		{
			question: 'Are you over 65?',
			answer: `No, I'm under 65`,
			prediction: 'Need More Questions Answered',
			additionalInfo: 'N/A',
			value: 'under65',
			nextQuestion: 'Are you obese?'

		}]
	}

	handleAnswerSelect = () => {
		console.log('yo')
	}

	render() {
		const dataSource = this.state.answeredArray.map((answer, idx) => {

			return {
				key: idx,
				question: answer.question,
				answered: answer.answer,
				prediction: answer.prediction,
				additionalInfo: answer.additionalInfo,
				nextQuestion: answer.nextQuestion
			
			}
		})

		const columns = [
			{
				title: 'Previous Questions',
				dataIndex: 'question'
			},
			{
				title: 'Answer',
				dataIndex: 'answered'
			},
			{
				title: 'Prediction',
				dataIndex: 'prediction'
			},
			{
				title: 'Additional Information',
				dataIndex: 'additionalInfo'
			},
			{
				title: 'Current Question',
				dataIndex: 'nextQuestion'
			},


		]

		return (
			<div>
			<PageHeader
    			title="Predictor"
    			className="site-page-header"
    			subTitle="Of Maximum Risk of COVID-19 Hospitalization"
    			tags={<Tag color="blue">{this.state.stageName}</Tag>}
    
    			avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    
  			>
    		
      		{content}
 
  			</PageHeader>
  			<Form className="question-form-wrapper">
  				<Form.Item label="Are you obese?" name="obese" rules={[{required: true, message: 'Selection is Required'}]}>
  					<Select placeholder="Select answer" style={{ width: 200 }} onChange={this.handleAnswerSelect}>
  						<Option value="obese">Yes, I'm obese</Option>
  						<Option value="notObese">No, I'm not obese</Option>

  					</Select>
  				</Form.Item>
  			</Form>
  			<Table
        		dataSource={dataSource}
        		columns={columns}
        		pagination={true}
        		className="table-column"
        		size="large"
      		/>
  			</div>

			)
	}
}