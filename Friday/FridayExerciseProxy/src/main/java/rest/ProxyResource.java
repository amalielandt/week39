/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author sofieamalielandt
 */
@Path("proxy")
public class ProxyResource {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ProxyResource
     */
    public ProxyResource() {
    }

    /**
     * Retrieves representation of an instance of rest.ProxyResource
     * @param country
     * @return an instance of java.lang.String
     * @throws java.net.MalformedURLException
     */
    @GET
    @Path("/{country}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCountry(@PathParam("country") String country) throws MalformedURLException, IOException {
        
        URL url = new URL("http://restcountries.eu/rest/v1/alpha?codes=" + country);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json;charset=UTF-8");
        Scanner scan = new Scanner(con.getInputStream());
        String jsonStr = null;
        if (scan.hasNext()) {
            jsonStr = scan.nextLine();
        }
        scan.close();
        
        return GSON.toJson(jsonStr);
    }
}
