import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperations } from '../../../help/type/IResource';
import { limitWaitTimeProperties } from '../../descriptions';
import { configureWaitTillDate } from '../../configureWaitTillDate.util';

export default {
	name: 'Wait Approve',
	value: 'approve:waitApprove',
	options: [
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			placeholder: 'Add option',
			default: {},
			options: [
				{
					displayName: 'Limit Wait Time',
					name: 'limitWaitTime',
					type: 'fixedCollection',
					description:
						'Whether the workflow will automatically resume execution after the specified limit type',
					default: {
						values: { limitType: 'afterTimeInterval', resumeAmount: 45, resumeUnit: 'minutes' },
					},
					options: [
						{
							displayName: 'Values',
							name: 'values',
							values: limitWaitTimeProperties,
						},
					],
				},
			],
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const waitTill = configureWaitTillDate(this, 'options', index);

		await this.putExecutionToWait(waitTill);

		return this.getInputData(index) as unknown as IDataObject;
	},
} as ResourceOperations;
