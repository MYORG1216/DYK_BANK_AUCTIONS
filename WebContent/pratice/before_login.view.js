sap.ui.jsview("wcontent.pratice.before_login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.before_login
	*/ 
	getControllerName : function() {
		debugger
		return "wcontent.pratice.before_login";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.before_login
	*/ 
	createContent : function(oController) {
	debugger
	var oView2=this;
		//login form
		oView2.user=new sap.m.Input({
			placeholder:"User Name",		
			width: "80%",
			value:"{user_account1>/loginFormData/user1}"
		});
		oView2.pass=new sap.m.Input({
			placeholder:"Password",
			type:sap.m.InputType.Password,
			width: "80%",
			value:"{user_account1>/loginFormData/pass1}"
		});

		oView2.formtag_login=new sap.m.FlexBox({
			height:"100%",
			visible:false,
			alignItems:sap.m.FlexAlignItems.Center,
			justifyContent:sap.m.FlexJustifyContent.Center,
			items:[
				new sap.ui.layout.form.Form("formsignin",{
		    		width:"80%",
					title:
			    		new sap.ui.core.Title({text:"LOGIN PAGE"}),
			    		
			    		layout:[
			    			new sap.ui.layout.form.FormLayout({
			    				backgroundDesign:sap.ui.layout.BackgroundDesign.Translucent
			    			})
			    		],
			    		  formContainers:[
			    	    new sap.ui.layout.form.FormContainer({
			    	    		formElements:[
			    	    			new sap.ui.layout.form.FormElement({
			    	    				
			    	    			   fields:[
			    	    					oView2.user,
			    	    					oView2.pass,
			    	    					new sap.m.Button("login",{
			    	    						text:"LOGIN",
			    	    						type:sap.m.ButtonType.Emphasized,
			    								width: "30%",
			    								press:[oController.login,oController]
			    	    						}).addStyleClass("sapUiMediumMarginEnd"),
			    	    					new sap.m.Button({
				    	    					text:"CANCEL",
				    	    					type:sap.m.ButtonType.Emphasized,
				    							width: "30%",
				    	    					press:[oController.cancel,oController]  
				    	    				    })
			    	    			     ]
			    	    			})
			    	    		]
			    	    	})
			    	    ]
			    			
			    	})
			]
		});

		oView2.TilesFlex=new sap.m.FlexBox({
			height:"100%",
			alignItems:sap.m.FlexAlignItems.Center,
			justifyContent:sap.m.FlexJustifyContent.Center,
			items:[
				new sap.m.GenericTile({
					header:"USER",
					headerImage:"sap-icon://account",
					subheader:"lOGIN",
					FrameType:sap.m.FrameType.TwoByOne,
					mode:sap.m.GenericTileMode.ContentMode,
					state:sap.m.LoadState.Loaded,
					sizeBehavior:sap.m.TileSizeBehavior.Small,
					tileContent:new sap.m.TileContent({
						content:[
							new sap.m.Button({
								text:"LOGIN",
								press:[oController.loginForm,oController]
							})
						]
					})
				}),
				new sap.m.GenericTile({
					header:"ON GOING",
					headerImage:"sap-icon://present",
					subheader:"AUCTIONS",
					FrameType:sap.m.FrameType.TwoByOne,
					mode:sap.m.GenericTileMode.ContentMode,
					state:sap.m.LoadState.Loaded,
					sizeBehavior:sap.m.TileSizeBehavior.Small,
					tileContent:new sap.m.TileContent({
						content:[
							new sap.m.Button({
								text:"MORE"
							})
						]
					})
				}).addStyleClass("sapUiMediumMargin"),
				new sap.m.GenericTile({
					header:"COMMING SOON",
					headerImage:"sap-icon://paper-plane",
					subheader:"AUCTIONS",
					FrameType:sap.m.FrameType.TwoByOne,
					mode:sap.m.GenericTileMode.ContentMode,
					state:sap.m.LoadState.Loaded,
					sizeBehavior:sap.m.TileSizeBehavior.Small,
					tileContent:new sap.m.TileContent({
						content:[
							new sap.m.Button({
								text:"MORE"
							})
						]
					})
				}),
				new sap.m.GenericTile({
					header:"COMPLETED",
					headerImage:"sap-icon://complete",
					subheader:"AUCTIONS",
					FrameType:sap.m.FrameType.TwoByOne,
					mode:sap.m.GenericTileMode.ContentMode,
					state:sap.m.LoadState.Loaded,
					sizeBehavior:sap.m.TileSizeBehavior.Small,
					tileContent:new sap.m.TileContent({
						content:[
							new sap.m.Button({
								text:"MORE"
							})
						]
					})
				}).addStyleClass("sapUiMediumMargin"),
			]
		});
		
	 		return new sap.m.Page({
	 			title: "DCB BANK AUCTIONS",			
				content: [				
					oView2.formtag_login,
					oView2.TilesFlex
				],

				footer:new sap.m.Bar({ 
					contentLeft:[
						new sap.m.Button({
							text:"Contact US",
							//icon:"sap-icon://world"
						    icon:"sap-icon://customer-and-contacts"
						}),
						new sap.m.Button({
							text:"Mail",
							icon:"sap-icon://email"
						}),
						new sap.m.Button({
							text:"Call",
							icon:"sap-icon://call"
						})					
					     ],
				   contentRight:[
					   new sap.m.Text({
							text:"Copyright"
						}),
					   new sap.m.Button({
							text:" 2018",
							icon:"sap-icon://sap-ui5"
						}),
						new sap.m.Text({
							text:"All rights reserved."
						})
				   ]
				})
			});
		}
	});