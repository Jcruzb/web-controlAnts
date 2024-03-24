
import { PieChart } from '@mui/x-charts/PieChart';

const  BasicPie = ({otherData}) => {
    console.log(otherData)
    
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