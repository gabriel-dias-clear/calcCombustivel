import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {
  
  const [visibiModal, setVisibiModal] = useState(false)
  const [valueAlcohol, setValueAlcohol] = useState('')
  const [valueGas, setValueGas] = useState('')
  const [object, setObject] = useState({})

  function Calc(valueGas, valueAl){

    let reValueGas = valueGas.replace(',', '.')
    let reValueAlc = valueAl.replace(',', '.')
    
    let calc = Number(reValueGas) / Number(reValueAlc)

    
    return calc.toFixed(2)
  }

  function HandleButton(){
    setVisibiModal(true)
    let calc = Calc(valueGas, valueAlcohol)

    if(calc < 0.7){
      let obj = {
        name: 'Alcohol',
        valueAlcohol,
        valueGas
      }
      return setObject(obj)
    } else if (calc > 0.7){
      let obj = {
        name: 'Gas',
        valueAlcohol,
        valueGas
      }
      return setObject(obj)
    }
  }

  function handleButtonReturn(){
    setVisibiModal(false)
    
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={visibiModal}
      >
        <View style={styles.container}>
          <Image
            source={require('./src/img/gas.png')}
          />
        <Text style={styleModal.title}>The best choice is {object.name}</Text>
        <Text style={styleModal.subtitle}>The prices:</Text>
        <Text style={styleModal.defaultText}>Alcohol: R${object.valueAlcohol}</Text>
        <Text style={styleModal.defaultText}>Gas: R${object.valueGas}</Text>
        <TouchableOpacity>
          <Text style={styleModal.btn} onPress={handleButtonReturn}>Calcular novamente</Text>
        </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.defaultDiv}>
        <Image
          source={require('./src/img/logo.png')}
        />
        <Text style={styles.text}>How's best option?</Text>
      </View>
        <Text style={styles.titleInput}>alcohol (price per liter):</Text>
        <TextInput
          onChangeText={value => setValueAlcohol(value)}
          value={valueAlcohol}
          style={styles.input}
          placeholder='alcohol value'
        />
        <Text style={styles.titleInput}>gas (price per liter):</Text>
        <TextInput
          onChangeText={value => setValueGas(value)}
          value={valueGas}
          style={styles.input}
          placeholder='gas value'
        />

        <TouchableOpacity onPress={HandleButton} style={styles.btn}>
          <View>
            <Text style={styles.textBtn}>
              calc
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultDiv:{
    alignItems: 'center',
    gap: 10,
    marginBottom: 40
  },
  text:{
    color:'white',
    fontSize: 25,
    fontWeight: "500",
  },
  input:{
    backgroundColor: 'white',
    color:'black',
    width: '80%',
    borderRadius: 5,
    padding: 5,
    marginBottom: 25
  },
  titleInput:{
    color:'white',
    fontWeight: '700',
    textAlign:'left'
  },
  btn:{
    backgroundColor:'green',
    padding:10,
    marginTop:8,
    borderRadius: 5,
    width: 80,
    alignItems: 'center'
    
  },
  textBtn:{
    fontWeight:'500',
    color:'white'
  }
});

const styleModal = StyleSheet.create({
  title:{
    color:'green',
    fontSize: 25,
    fontWeight: "500"
  },
  subtitle:{
    color:'white',
    fontSize: 22,
    fontWeight: "500"
  },
  defaultText:{
    color:'white'
  },
  btn:{
    color:'black',
    backgroundColor: 'red',
    padding: 8,
    fontWeight: '700',
    borderRadius: 10
  }
})
