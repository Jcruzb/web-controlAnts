
import { PieChart } from '@mui/x-charts/PieChart';

// eslint-disable-next-line react/prop-types
const  BasicPie = ({otherData}) => {
   
  return (
    <PieChart
      series={[
        {
          data: [...otherData
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default BasicPie