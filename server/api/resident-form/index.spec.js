'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var residentFormCtrlStub = {
  index: 'residentFormCtrl.index',
  show: 'residentFormCtrl.show',
  create: 'residentFormCtrl.create',
  upsert: 'residentFormCtrl.upsert',
  patch: 'residentFormCtrl.patch',
  destroy: 'residentFormCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var residentFormIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './resident-form.controller': residentFormCtrlStub
});

describe('ResidentForm API Router:', function() {
  it('should return an express router instance', function() {
    expect(residentFormIndex).to.equal(routerStub);
  });

  describe('GET /api/resident-forms', function() {
    it('should route to residentForm.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'residentFormCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/resident-forms/:id', function() {
    it('should route to residentForm.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'residentFormCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/resident-forms', function() {
    it('should route to residentForm.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'residentFormCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/resident-forms/:id', function() {
    it('should route to residentForm.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'residentFormCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/resident-forms/:id', function() {
    it('should route to residentForm.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'residentFormCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/resident-forms/:id', function() {
    it('should route to residentForm.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'residentFormCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
