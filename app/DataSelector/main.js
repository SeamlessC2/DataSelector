var data_controller = null;
var widget_controller = null;

owfdojo.addOnLoad(function() {
    OWF.ready(function(){
        data_controller = new DataController();
        data_controller.init();
        var data_panel = data_controller.getSelectionPanel();
                
        widget_controller = new WidgetController();
        widget_controller.init();        
        var widget_panel = widget_controller.getWidgetDataView();
        
        //handle data selection
        var data_selection_listener = function(recommendations,data_source_data){
            widget_controller.widget_recommendations = recommendations;
            widget_controller.updateStore(data_source_data);
            cardNavChange(1);
        };
        data_controller.addSelectionListeners(data_selection_listener);
        
        var data_banner_panel = Ext.create('Ext.Panel', {
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,
            defaults: {
                border:false
            },
            height: 100,
            width:"100%",
            items: [
            {
                html:"<div class='banner'>Select Data Source</div>",
                flex:1
            },

            {
                html:"<div class='text'>Select a Tailor data source or provide a URL for this widget.</div>",
                height: 40
            },
            ]

        });        
        
        var widget_banner_panel = Ext.create('Ext.Panel', {
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,            
            defaults: {
                border:false
            },
            height: 100,
            width:"100%",
            items: [
            {
                html:"<div class='banner'>Select Widget</div>",
                flex:1
            },

            {
                html:"<div class='text'>Select a widget for this data.</div>",
                height: 20
            },
            {
                html:"<div class='text widget_recommended'>Recommended widgets are highlighted</div>",
                height: 20
            },
            ]

        });
                 
        //var dashchooser = dashboard_controller.getDashboardLayoutDataView();
        var widget_main_panel = Ext.create('Ext.Panel', {
            id: "widget_main_panel",
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,            
            defaults: {
                border:false
            },
            width:'100%',
            items: [
            widget_banner_panel,
            widget_panel
            ]
        });
         
        //var dashchooser = dashboard_controller.getDashboardLayoutDataView();
        var data_main_panel1 = Ext.create('Ext.Panel', {
            id: "data_main_panel1",
            layout: {
                type: 'vbox',
                align: 'center'
            },
            width:"100%",
            height:500,
            border: false,
            defaults: {
                border:false
            },
            items: [
            data_banner_panel,
            data_panel
            ]
        });
        var data_main_panel = Ext.create('Ext.Panel', {
            id: "data_main_panel",
            autoScroll:true,
            border: false,
            defaults: {
                border:false
            },
            items: [
            data_main_panel1
            ]
        });


        var cardNavChange = function(id){
            var l = Ext.getCmp('card-wizard-panel').getLayout();
            l.setActiveItem(id);
        };
    
        var cardWizard = Ext.create('Ext.Panel',  {
            id:'card-wizard-panel',
            layout:'card',
            activeItem: 0,
           
            items: [
            data_main_panel,widget_main_panel
            ], 
            bbar:[{
                id: 'card-prev',
                text: 'DataSource Selector',
                handler: Ext.Function.bind(cardNavChange, this, [0])
                    
            },
            '-',
            {
                id: 'card-next',
                text: 'Widget Selection',
                handler: Ext.Function.bind(cardNavChange, this, [1])
            }]            
        });
        
        Ext.application({
            name: 'DataComposer',
            launch: function() {
                Ext.create('Ext.container.Viewport', {
                    id: "main-panel",
                    layout: 'fit',
                    defaults: {
                        border:false
                    },
                    //width: 600,
                    //height: 350,                   
                    items: [
                    cardWizard
                    ]
                });      
            }
        });
        
        
    });
    
});
