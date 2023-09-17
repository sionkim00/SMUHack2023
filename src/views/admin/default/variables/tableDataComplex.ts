type RowObj = {
	assetID: number;
	status: string;
	date: string;
};

const tableDataComplex: RowObj[] = [
	{
		assetID: 1,
		status: 'Completed',
		date: '12 Jan 2021'
	},
	{
		assetID: 8,
		status: 'Working',
		date: '21 Feb 2021'
	},
	{
		assetID: 10,
		status: 'Pending',
		date: '13 Mar 2021'
	},
	{
		assetID: 13,
		status: 'Completed',
		date: '24 Oct 2022'
	}
];
export default tableDataComplex;
