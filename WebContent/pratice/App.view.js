sap.ui.jsview("wcontent.pratice.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.App
	*/ 
	getControllerName : function() {
		debugger
		return "wcontent.pratice.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.App
	*/ 
	createContent : function(oController) {
 		return new sap.m.App("appid",{});
	}

});