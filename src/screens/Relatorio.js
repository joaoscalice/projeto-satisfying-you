import {View, StyleSheet, Image} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {useSelector} from 'react-redux';

const colors = {
  pessimo: '#53D8D8',
  ruim: '#EA7288',
  neutro: '#5FCDA4',
  bom: '#6994FE',
  excelente: '#F1CE7E',
};

const Relatorio = () => {
  const graficoRelatorio = require('../../imgs/GraficoRelatorio.png');

  const avaliacoes = useSelector(state => state.pesquisa.avaliacoes);
  console.log('Avaliação: ', avaliacoes);

  const data = Object.keys(avaliacoes).map((key, index) => ({
    key: index,
    value: avaliacoes[key],
    svg: {fill: colors[key]},
  }));

  return (
    <View style={estilos.tela}>
      <PieChart
        style={{height: 200, width: 200}}
        outerRadius={'80%'}
        innerRadius={10}
        data={data}
      />
      <Image source={graficoRelatorio} style={{width: 200, height: 200}} />
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#372775',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 40,
  },
});

export default Relatorio;
