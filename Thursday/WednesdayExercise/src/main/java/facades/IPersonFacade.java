/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entities.Person;
import exceptions.PersonNotFoundException;
import java.util.List;

/**
 *
 * @author sofieamalielandt
 */
public interface IPersonFacade {
    
  public Person addPerson(String firstname, String lastname, String phone) throws Throwable;  
  public Person deletePerson(long id) throws PersonNotFoundException;  
  public Person getPerson(long id) throws PersonNotFoundException;  
  public List<Person> getAllPersons() throws Throwable;  
  public Person editPerson(Person p) throws PersonNotFoundException, Throwable; 
    
}
