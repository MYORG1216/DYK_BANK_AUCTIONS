sap.ui.jsview("wcontent.pratice.manager", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.manager
	*/ 
	getControllerName : function() {
		return "wcontent.pratice.my_account";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.manager
	*/ 
	createContent : function(oController) {
		oView2 =this;
		oView2.messageBox=new sap.m.MessageStrip({
			visible:false,
			type:sap.ui.core.MessageType.Success,
			text:""
		});
		oView2.oFormElement = new sap.ui.layout.form.FormElement({
			fields:[
				new sap.m.Input
				({
					placeholder:"Title",
					width: "80%",
					value:"{user_account1>/pushspec/2/Name}"
				}),
			
				new sap.m.Input
				({
					placeholder:"Image Name",
					width: "80%",
					value:"{user_account1>/pushspec/1/Name}"
				}),
				new sap.ui.unified.FileUploader({
					fileType: ["jpg", "png", "bmp"],
					icon:"sap-icon://add-photo",
					placeholder:"Image Address",
					iconOnly:true,
					change:[oController.imgChange,oController],
					uploadComplete:[oController.imgUpload,oController]
				}),
				new sap.m.Input
				({
					placeholder:"Info",
					width: "80%",
					value:"{user_account1>/pushspec/2/Value}"
				}),
				new sap.m.Button
				({
					text:"MORE DETAILS",
					icon:"sap-icon://add",
					type:sap.m.ButtonType.Emphasized,
					width: "30%",
					press:[oController.more,oController]
				}),
				
				
				new sap.m.Input
				({
					placeholder:"Starting Bid",
					width: "80%",
					value:"{user_account1>/pushproducts/StartPrice}"
				}),
			
				new sap.m.Button
				({
					text:"ADD",
					type:sap.m.ButtonType.Emphasized,
					width: "30%",
					press:[oController.addAuction,oController]
				}).addStyleClass("sapUiSmallMarginEnd"),
				new sap.m.Button
				({
					text:"CANCEL",
					type:sap.m.ButtonType.Emphasized,
					width: "30%",
					press:[oController.cancelAdd,oController]    							
				})
   		    		
			]
		});
		
		oView2.oFormContainer = new sap.ui.layout.form.FormContainer({
    		formElements:[
    			oView2.oFormElement
    		]
    	});
		oView2.block = new sap.ui.layout.BlockLayout({
			background:sap.ui.layout.BlockBackgroundType.Accent,
			content:[
				new sap.ui.layout.BlockLayoutRow({
					rowColorSet:sap.ui.layout.BlockRowColorSets.ColorSet3,
					content:[
						new sap.ui.layout.BlockLayoutCell({
							title:"ADDING",
							width:2,
							content:[
								new sap.m.GenericTile({
									header:"Add New Users",
									headerImage:"sap-icon://add-employee",
									FrameType:sap.m.FrameType.TwoByOne,
									mode:sap.m.GenericTileMode.ContentMode,
									subheader:"New Account",
									state:sap.m.LoadState.Loaded,
									press:[oController.addUserFormVis,oController]
								}).addStyleClass("sapUiLargeMargin"),
								new sap.m.GenericTile({
									header:"Add New Auction",
									headerImage:"sap-icon://add-product",
									FrameType:sap.m.FrameType.TwoByOne,
									mode:sap.m.GenericTileMode.ContentMode,
									subheader:"New Auction",
									state:sap.m.LoadState.Loaded,
									press:[oController.addAuctionFormVis,oController]
								}).addStyleClass("sapUiLargeMargin"),
							]
						}),
						new sap.ui.layout.BlockLayoutCell({
							title:"Auctions",
							content:[
								 new sap.m.Button({
										text:"FINISH THE AUCTION",
										press:[oController.finishBtn,oController]
									}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Button({
										text:"GET RECENT WINNERS",
										press:[oController.winnerBtn,oController]
									}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Button({
										text:"NEXT AUCTION",
										press:[oController.NextBtn,oController]
									}).addStyleClass("sapUiSmallMargin"),
							]
						})
					]
				}),
				new sap.ui.layout.BlockLayoutRow({
					rowColorSet:sap.ui.layout.BlockRowColorSets.ColorSet3,
					content:[
						new sap.ui.layout.BlockLayoutCell({
							title:"All Details",
							width:1,
							content:[
								 new sap.m.Button({
										text:"Get All Users",
										press:[oController.getAllusers,oController]
									}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Button({
										text:"Get All Auctions",
										press:[oController.GetAllAuctions,oController]
									}).addStyleClass("sapUiSmallMargin")
							]
						}),
						new sap.ui.layout.BlockLayoutCell({
							title:"Searching",
							content:[
									new sap.m.Input({
	    							    placeholder:"Auction Id",
	    							    width: "50%",
	    							}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Button({
										text:"Search",
//										press:[oController.winnerBtn,oController]
									}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Input({
	    							    placeholder:"Adhar No",
	    							    width: "50%",
	    							}).addStyleClass("sapUiSmallMargin"),
									new sap.m.Button({
										text:"Search",
//										press:[oController.winnerBtn,oController]
									}).addStyleClass("sapUiSmallMargin")
							]
						})
					]
				}),
				
				
			]
		});
		oView2.addAuction=new sap.m.Popover({
			modal:true,
			showArrow:false,
			title:"Add Customer Form",
			contentWidth:"40%",
			offsetX:-200,
			offsetY:-20,
			content:[
				new sap.ui.layout.form.Form({
		    		layout:[
		    			new sap.ui.layout.form.FormLayout({
		    				backgroundDesign:sap.ui.layout.BackgroundDesign.Translucent
		    			})
		    		],
		    	    formContainers:[
		    	    	oView2.oFormContainer
		    	    ]
		    			
		    	}).addStyleClass("textAlignCenter")
			]
		});
		oView2.addUser=new sap.m.Popover({
			modal:true,
			showArrow:false,
			title:"Add Auction Form",
			contentWidth:"40%",
			offsetX:50,
			offsetY:10,
			content:[
				new sap.m.Input
				({
				    placeholder:"AdharNo",
				    width: "80%",
				    value:"{user_account1>/signupFormData/AdharNo}"
				}),
				new sap.m.Input
				({
					placeholder:"password",
					type:sap.m.InputType.Password,
					width: "80%",
					value:"{user_account1>/signupFormData/Password}"
				}),
				new sap.m.Input
				({
					placeholder:"FullName",
					width: "80%",
					value:"{user_account1>/signupFormData/FullName}"
				}),
				new sap.m.Label({
					text:"Date of Birth Should be in this Formet YYYYMMDD"
				}).addStyleClass("sapUiLargeMarginBegin"),
				new sap.m.Input
				({
					placeholder:"Date of Birth",
					width: "80%",
					value:"{user_account1>/signupFormData/Dob}"
				}),
				new sap.m.ComboBox
				({
					width: "80%",
					selectedKey:"{user_account1>/signupFormData/Gender}",
					items:[
						new sap.ui.core.Item({
							text:"MALE",
							key:"MALE"
						}),
						new sap.ui.core.Item({
							text:"FEMALE",
							key:"FEMALE"
						}),
						new sap.ui.core.Item({
							text:"OTHERS",
							key:"OTHERS"
						})
					]
				}),
				new sap.m.Input
				({
					placeholder:"Mobile No",
					width: "80%",
					value:"{user_account1>/signupFormData/MobileNo}"
				}),
				new sap.m.ComboBox
				({
					width: "80%",
					
					selectedKey:"{user_account1>/signupFormData/UserRole}",
					items:[
						new sap.ui.core.Item({
							text:"USER",
							key:"USR"
						}),
						new sap.ui.core.Item({
							text:"ADMIN",
							key:"ADM"
						})
					]
				}),
				new sap.m.Button
				({
					text:"ADD",
					type:sap.m.ButtonType.Emphasized,
					width: "30%",
					press:[oController.signup,oController]
				}).addStyleClass("sapUiSmallMarginEnd"),
				new sap.m.Button
				({
					text:"CANCEL",
					type:sap.m.ButtonType.Emphasized,
					width: "30%",
					press:[oController.cancelAdd,oController]    							
				})
			]
		}).addStyleClass("textAlignCenter");
		oView2.finish=new sap.m.Popover({
			modal:true,
			showArrow:false,
			title:"Auction Winner",
			contentWidth:"40%",
			offsetX:-200,
			offsetY:-20,
			beginButton:new sap.m.Button({
				text:"Close",
				press:[oController.cancelAdd,oController]
			}),
			content:[
				new sap.m.DisplayListItem({
					label:"Adhar No",
					value:"{user_account1>/currentWinner/AdharNo}",
				}),
				new sap.m.DisplayListItem({
					label:"Auction Id",
					value:"{user_account1>/currentWinner/AuctionId}",
				}),
				new sap.m.DisplayListItem({
					label:"Bid Price",
					value:"{user_account1>/currentWinner/BidPrice}",
				})
			]
		});
		oView2.winnerForm=new sap.m.Popover({
			modal:true,
			showArrow:false,
			title:"Auction Winner",
//			contentWidth:"40%",
//			offsetX:-200,
//			offsetY:-20,
			beginButton:new sap.m.Button({
				text:"Close",
				press:[oController.cancelAdd,oController]
			}),
			content:[
				new sap.ui.layout.form.Form({
		    		layout:[
		    			new sap.ui.layout.form.FormLayout({
		    				backgroundDesign:sap.ui.layout.BackgroundDesign.Translucent
		    			})
		    		],
		    	    formContainers:[
		    	    	new sap.ui.layout.form.FormContainer({
		    	    		formElements:{
		    	    			path:"user_account1>/Winners",
								factory:(sIdx,oContext)=>{
		    	    			return new sap.ui.layout.form.FormElement({
		    	    				fields:[
		    	    					new sap.m.Text({
											text:"Auction Winner"
										}),
										new sap.m.DisplayListItem({
											label:"Adhar No",
											value:"{user_account1>LastBidBy}",
										}),
										new sap.m.DisplayListItem({
											label:"Auction Id",
											value:"{user_account1>AuctionId}",
										}),
										new sap.m.DisplayListItem({
											label:"Bid Price",
											value:"{user_account1>CurrentBid}",
										})
		    	    	   		    		
		    	    				]
		    	    			})
								}
		    	    		}
		    	    	})
		    	    ]
		    			
		    	}).addStyleClass("textAlignCenter")
			]
		});
		oView2.addDependent(oView2.winnerForm);
		oView2.addDependent(oView2.addAuction);
		oView2.addDependent(oView2.addUser);
		oView2.addDependent(oView2.finish);
		oView2.addDependent(oView2.winnerForm);
 		return new sap.m.Page({
			title: "Admin Portal",
			showNavButton:true,
			navButtonPress:[oController.navButton,oController],

			content: [
				oView2.block,
//				oView2.addUser,
//				oView2.finish,
//				oView2.winnerForm,
				oView2.messageBox,

			],
			footer:new sap.m.Bar({ 
				contentRight:[
				]
			})
		});
	}

});