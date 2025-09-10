import { IDataObject, IExecuteFunctions, UnexpectedError } from 'n8n-workflow';
import { ResourceOperations } from '../../../help/type/IResource';
import { generateUrlSignature, prepareUrlForSigning, WAITING_TOKEN_QUERY_PARAM } from 'n8n-core';

function getSignedResumeUrl(
	this: any,
	parameters: Record<string, string> = {},
	nodeId: string,
) {
	const { webhookWaitingBaseUrl, executionId } = this.additionalData;

	if (typeof executionId !== 'string') {
		throw new UnexpectedError('Execution id is missing');
	}

	const baseURL = new URL(`${webhookWaitingBaseUrl}/${executionId}/${nodeId}`);

	for (const [key, value] of Object.entries(parameters)) {
		baseURL.searchParams.set(key, value);
	}

	const urlForSigning = prepareUrlForSigning(baseURL);

	const token = generateUrlSignature(urlForSigning, this.instanceSettings.hmacSignatureSecret);

	baseURL.searchParams.set(WAITING_TOKEN_QUERY_PARAM, token);

	return baseURL.toString();
}

export default {
	name: 'Get Approve Url',
	value: 'approve:getApproveUrl',
	options: [
		{
			displayName: 'Please copy the node and get the Wait Approve Node ID from json.',
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Wait Approve Node ID',
			name: 'nodeId',
			type: 'string',
			default: '',
			description: 'The ID of the wait node to approve or reject',
			required: true,
		}
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const nodeId = this.getNodeParameter('nodeId', index, '') as string;

		this.setSignatureValidationRequired();

		const approvedUrl = getSignedResumeUrl.call(this, { approved: 'true' }, nodeId);
		const disApprovedUrl = getSignedResumeUrl.call(this, { approved: 'false'}, nodeId);

		return {
			approvedUrl,
			disApprovedUrl
		};
	},
} as ResourceOperations;
