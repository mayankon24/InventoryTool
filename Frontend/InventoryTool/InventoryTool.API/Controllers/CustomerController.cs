﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;
using InventoryTool.Model;
using InventoryTool.Provider;

namespace InventoryTool.API.Controllers
{
    [RoutePrefix("api/Customer")]
    public class CustomerController : ApiController
    {
        [Route("AddUpdateCustomer")]
        [HttpPost]
        public int AddUpdateCustomer(M_Customer Customer)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdateCustomer(Customer.Customer_Id, Customer.Customer_Code, Customer.Customer_Name, Customer.Contact_No,
                    Customer.Email, Customer.Address1, Customer.Address2, Customer.City, Customer.State, Customer.PinCode, 
                    Customer.TinNo, Customer.VatNo, Customer.Note, Customer.LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }


        [Route("DeleteCustomer/{Customer_Id:int?}/{LastModifiedBy?}")]
        [HttpPost]
        public int DeleteCustomer(int Customer_Id, string LastModifiedBy)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.DeleteCustomer(Customer_Id, LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }

        [Route("AllCustomer")]
        [HttpGet]
        public List<GetAllCustomer_Result> GetAllCustomer()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllCustomer().ToList().Select(s => new GetAllCustomer_Result
                {                    
                    Customer_Code = s.Customer_Code,
                    Customer_Id = s.Customer_Id,
                    Customer_Name = s.Customer_Name,
                    Address1 = s.Address1,
                    Address2 = s.Address2,
                    City = s.City,
                    Contact_No = s.Contact_No,
                    Email = s.Email,
                    Note = s.Note,
                    PinCode = s.PinCode,
                    State = s.State,
                    TinNo = s.TinNo,
                    VatNo = s.VatNo
                    
                }).ToList();
                return RetVal;
            }

        }
    }
}