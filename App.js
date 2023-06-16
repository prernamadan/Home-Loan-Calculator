import React, { useState } from 'react';
import { View, Text, TextInput, Slider, Button, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(10000);
  const [otherEmis, setOtherEmis] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loanEligibility, setLoanEligibility] = useState(0);
  const[MonthlyEMI,setMonthlyEMI]= useState(0);
  const checkpop=() =>{
    if (otherEmis > (0.5*monthlyIncome)) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

  }

  const calculateLoan = () => {
    const Ir=interestRate;
    const l = (((((0.5*monthlyIncome - otherEmis)+(monthlyIncome))*0.5)*70));
    const m= ((0.5*monthlyIncome) - otherEmis)*12*6;
    let loanAmount;

    if (l > m) {
      loanAmount = l;
    } else {
      loanAmount = m;
    }
    const loanAmountInterest = loanAmount*Ir*tenure*0.01;
    const emi= ((loanAmount+loanAmountInterest)/(tenure * 12));
    setLoanEligibility(formatCurrency(loanAmount.toFixed(2)));
    setMonthlyEMI(formatCurrency(emi.toFixed(2)));

  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(number);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
            <Text>{"\n"}</Text>

      <View style={styles.iconContainer}>
       <Icon name="home" size={32} color="#581845" />
        <Text style={styles.heading}>Home Loan Calculator</Text>
      </View>
      <Text>{"\n"}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Monthly Income:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => {
            if (value === '') {
              setMonthlyIncome(0);
            } else {
              const sanitizedValue = Number(value.replace(/[^0-9]/g, ''));
              setMonthlyIncome(sanitizedValue);
            }
          }}    
          value={formatCurrency(String(monthlyIncome))}   />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={10000}
        maximumValue={1000000}
        step={1000}
        value={monthlyIncome}
        onValueChange={(value) => setMonthlyIncome(value)}
        minimumTrackTintColor="#C70039"
        maximumTrackTintColor="#C70039"
        thumbTintColor="#C70039"
      />
      <Text style={styles.rangeText}>10,000 to 10,00,000</Text>
      <Text>{"\n"}</Text>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Other Monthly EMIs:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formatCurrency(String(otherEmis))}
          onChangeText={(value) => setOtherEmis(Number(value.replace(/[^0-9]/g, '')))}
        />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={monthlyIncome}
        step={1000}
        value={otherEmis}
        onValueChange={(value) => setOtherEmis(value)}
        minimumTrackTintColor="#C70039"
        maximumTrackTintColor="#C70039"
        thumbTintColor="#C70039"
      />
      <Text style={styles.rangeText}>0 to {formatCurrency(String(monthlyIncome))}</Text>
      <Text>{"\n"}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tenure (in years):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(tenure)}
          onChangeText={(value) => setTenure(Number(value.replace(/[^0-9]/g, '')))}
        />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={30}
        step={1}
        value={tenure}
        onValueChange={(value) => setTenure(value)}
        minimumTrackTintColor="#C70039"
        maximumTrackTintColor="#C70039"
        thumbTintColor="#C70039"
      />
      <Text style={styles.rangeText}>0 to 30 years</Text>
      <Text>{"\n"}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Interest Rate (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(interestRate)}
          onChangeText={(value) => setInterestRate(Number(value.replace(/[^0-9.]/g, '')))}
        />
      </View>
      <Slider
        style={[styles.slider, { width: '80%' }]}
        minimumValue={0}
        maximumValue={15}
        step={0.1}
        value={interestRate}
        onValueChange={(value) => setInterestRate(value)}
        minimumTrackTintColor="#C70039"
        maximumTrackTintColor="#C70039"
        thumbTintColor="#C70039"
      />
      <Text style={styles.rangeText}>0 to 15%</Text>
      <Text style={styles.lineGap}></Text>
      

      <Button
        title="Calculate  Eligibility"
        onPress={calculateLoan}
        color="#581845"
        style={styles.button}
        borderRadius={10}
      />
       <Text style={styles.result}>Loan Eligibility:  {loanEligibility}</Text>
       <Text style={styles.lineGap1}></Text>
      <Text style={styles.result}>Monthly EMI:  {MonthlyEMI}</Text>

      {showPopup && (
        <View style={styles.popupContainerWrapper}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>
            We are unable to show you any offers currently as your total EMIs exceed your monthly income.
            You can go back and modify your inputs if you wish to recalculate your eligibility.
          </Text>
          <Button
            title="Close"
            onPress={() => setShowPopup(false)}
            color="#581845"
            style={styles.popupButton}
            borderRadius={10}
          />
        </View>
        </View>
      )}
        </ScrollView>

  );
};

const styles = StyleSheet.create({
   container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFC300',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lineGap: {
    height: 16, // Adjust the height as needed
  },
  lineGap1: {
    height: 6, // Adjust the height as needed
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#581845',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight:10,

  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#581845',
    marginRight: 8,
  },
  input: {
    height: 40
  },
  slider: {
    width: '100%',
    margin: 8,
  },
  rangeText: {
    fontSize: 14,
    color: '#581845',
  },
  button: {
    marginTop: 16,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#581845',
  },
  popupContainerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupText: {
    marginBottom: 16,
  },
  popupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  popupButton:{
    margin:12,
    padding:5,
  },
  
  
});

export default App;
