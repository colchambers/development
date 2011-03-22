/*
 * File containing the metabolism class 
 */
 
function Metabolism(){
	
	this.initialise = Metabolism_initialise;
	function Metabolism_initialise(){
		return 'initialised';
	}
	
	/*
	 * @param int lbm lean body mass (kg)
	 */
	this.calculateMetabolicRate = Metabolism_calculateMetabolicRate; 
	function Metabolism_calculateMetabolicRate(lbm){
		// Using the McArdle Katch formula
		var kg = 1;
		return ((lbm*21.6)/kg)+370;
	}

	/*
	 * Calculate the TEF value from a set number o calories. Use the standard value of 10%
	 * for now.
	 * ref: http://www.caloriesperhour.com/tutorial_thermic.php
	 * for more advanced values for TEF visit http://www.exrx.net/FatLoss/EnergyBalance.html
	 * @param int number of calories eaten
	 * @param int type of calculation to do
	 *
	 */

	this.calculateThermicEffectOfFood = Metabolism_calculateThermicEffectOfFood
	function Metabolism_calculateThermicEffectOfFood(calories, type){
		return calories*0.1;
	}

	/*
	 * Keep it simple for now. Just use walking as the standard and work out the conversion
	 * equation from the reference given
	 * @ref http://www.brianmac.co.uk/energyexp.htm
	 * @param int mass weight in kg
	 * @param int speed in km/h
	 */
	this.calculateExerciseEnergyExpenditure  = Metabolism_calculateExerciseEnergyExpenditure; 
	function Metabolism_calculateExerciseEnergyExpenditure(mass, speed){

		/*
		 * I'm going to write a best guess converter here since I can't find a
		 * real equation. I'm using walking at 3.0 mph as the reference for light exercise
		 * and 5 as the conversion factor as in 54(kg)/3.0(mph)/5(conversion) = 3.6 approx
		 */
		var conversionFactor = 45;
		return (mass*speed)/conversionFactor;

	}
	
	/*
	 * @param int wieight person weight(kg)
	 * @param int percentFat percent of weight as fat(%)
	 */
	this.calculateLeanBodyMass = Metabolism_calculateLeanBodyMass;
	function Metabolism_calculateLeanBodyMass(weight, percentFat){
		return weight-(weight*(percentFat/100));
	}
	
	this.calculateCalorieDifference = Metabolism_calculateCalorieDifference;
	function Metabolism_calculateCalorieDifference(caloriesIn, caloriesOut){
		return caloriesIn-caloriesOut;
	}

}