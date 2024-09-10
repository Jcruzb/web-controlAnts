
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';



// eslint-disable-next-line react/prop-types
const BasicPie = ({ otherData }) => {
  console.log(otherData)


  const data = [...otherData]?.map((data) => {
    return {
      id: data.id,
      label: data.name,
      value: data.value,
      date: data.date
    }
  })


  return (

    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      width={500}
      height={200}
    />

  );
}

export default BasicPie