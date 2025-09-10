import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperations } from '../../../help/type/IResource';
import { limitWaitTimeProperties } from '../../descriptions';
import { configureWaitTillDate } from '../../configureWaitTillDate.util';

export default {
	name: 'Wait Approve',
	value: 'approve:waitApprove',
	options: limitWaitTimeProperties,
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const waitTill = configureWaitTillDate(this, 'root');

		await this.putExecutionToWait(waitTill);

		return this.getInputData(index) as unknown as IDataObject;
	},
} as ResourceOperations;
