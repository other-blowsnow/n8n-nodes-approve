import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperations } from '../../../help/type/IResource';

export default {
	name: 'Get Approve Url',
	value: 'approve:getApproveUrl',
	options: [],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {

		this.setSignatureValidationRequired();

		const approvedUrl = this.getSignedResumeUrl({ approved: 'true' });
		const disApprovedUrl = this.getSignedResumeUrl({ approved: 'false' });

		return {
			approvedUrl,
			disApprovedUrl
		};
	},
} as ResourceOperations;
