import 'fabric';
declare let fabric: any;

//NAMEDPOLYLINE
fabric.NamedPolyline = fabric.util.createClass(fabric.Polyline, {

    type: 'NamedPolyline',

    initialize: function (element: any, options: { name: any; }) {
        this.callSuper('initialize', element, options);
        options && this.set('name', options.name);
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
    },
    _render: function (ctx: any) {
        this.callSuper('_render', ctx);
    },
});
fabric.NamedPolyline.fromObject = function (object: any, callback: any) {
    return fabric.Object._fromObject('NamedPolyline', object, callback, 'name');
};
//NAMEDPOLYLINE
//POSICIONRECT
fabric.PosicionRect = fabric.util.createClass(fabric.Rect, {

    type: 'PosicionRect',

    initialize: function (element: any, options: { name: any; }) {
        this.callSuper('initialize', element, options);
        options && this.set('name', options.name);
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
    },
    _render: function (ctx: any) {
        this.callSuper('_render', ctx);
        ctx.textAlign = "end"; 
        ctx.fillStyle = '#333';
        ctx.fillText(this.name, 0, 0);
    },
});
fabric.PosicionRect.fromObject = function (object: any, callback: any) {
    return fabric.Object._fromObject('PosicionRect', object, callback);
};
//POSICIONRECT

export const customFabric = fabric;