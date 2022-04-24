<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\ApiHelpers;
use App\Models\Respuesta;

class CompanyController extends Controller
{
    public function newCompany()
    {
        try{
            $data = [
                'name_company' => request('name_company'),
                'number_user' => request('number_users'),
                'rfc' => request('rfc'),
                'id_user_admin' => request('id_user_admin'),
                'active' => request('active')
            ];
            
            $newCompany = ApiHelpers::httpRequest('post','company/new-company', $data);
    
            return response()->json($newCompany);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getCompanys()
    {
        try{
            $getCompanys = ApiHelpers::httpRequest('get', 'company/get-companys');

            return response()->json($getCompanys);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public  function deleteCompany()
    {
        try{
            $data = [
                'id_company' => request('id_company')
            ];

            $deleteCompany = ApiHelpers::httpRequest('post', 'company/delete-company', $data);

            return response()->json($deleteCompany);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public function updateCompany()
    {
        try{
            $data = [
                'id_company' => request('id_company'),
                'name_company' => request('name_company'),
                'number_user' => (int)request('number_users'),
                'rfc' => request('rfc'),
                'id_user_admin' => request('id_user_admin'),
                'active' => request('active')
            ];
            
            $updateComp = ApiHelpers::httpRequest('post', 'company/update-company', $data);

            return response()->json($updateComp);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public function addUserRelComp()
    {
        $res = new Respuesta;
        $data = [
            "id_user" => request("id_user"),
            "id_company" => request('id_company')
        ];
        
        try{
            $result = ApiHelpers::httpRequest('post', 'company/add-user-relathion', $data);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function userRelathion()
    {
        $res = new Respuesta;
        
        try{
            $result = ApiHelpers::httpRequest('get', 'company/get-user-relathion', ["id_company" => request('id_company')]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function deleteRelationComUser()
    {
        $res = new Respuesta;

        try{
            $result = ApiHelpers::httpRequest('post', 'company/delete-user-relathion', ["id_pivote" => request("idPivot")]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
}
