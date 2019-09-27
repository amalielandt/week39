package facades;

import entities.Person;
import exceptions.PersonNotFoundException;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

/**
 *
 * Rename Class to a relevant name Add add relevant facade methods
 */
public class PersonFacade implements IPersonFacade {

    private static PersonFacade instance;
    private static EntityManagerFactory emf;

    //Private Constructor to ensure Singleton
    private PersonFacade() {
    }

    /**
     *
     * @param _emf
     * @return an instance of this facade class.
     */
    public static PersonFacade getFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new PersonFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public Person addPerson(String firstname, String lastname, String phone) throws Throwable {

        if (firstname.length() < 2) {

            throw new Exception("Firstname must be more than 2 characters");
        }

        if (firstname.length() < 3) {

            throw new Exception("Lastname must be more than 3 characters");
        }

        if (phone.length() < 8 || phone.length() > 8 || !phone.matches("[0-9]+")) {

            throw new Exception("Phonenumber must be 8 digits");
        }

        EntityManager em = getEntityManager();
        Person person = new Person(firstname, lastname, phone);
        
        try {
            em.getTransaction().begin();
            em.persist(person);
            em.getTransaction().commit();

        } finally {
            em.close();
        }

        return person;
    }

    @Override
    public Person deletePerson(long id) throws PersonNotFoundException {
        EntityManager em = getEntityManager();
        Person person;

        try {
            em.getTransaction().begin();
            person = em.find(Person.class,
                    id);

            if (person == null) {

                throw new PersonNotFoundException("Could not delete, provided id does not exist");
            }

            em.remove(person);
            em.getTransaction().commit();

        } finally {
            em.close();
        }

        return person;
    }

    @Override
    public Person getPerson(long id) throws PersonNotFoundException {

        EntityManager em = getEntityManager();
        Person person = em.find(Person.class,
                id);

        if (person == null) {

            throw new PersonNotFoundException("No person with provided id found");
        }

        return person;
    }

    @Override
    public List<Person> getAllPersons() {

        EntityManager em = getEntityManager();

        TypedQuery<Person> query = em.createQuery("SELECT p FROM Person p", Person.class);
        return query.getResultList();
    }

    @Override
    public Person editPerson(Person p) throws PersonNotFoundException, Throwable {
        
        if (p == null) {

            throw new PersonNotFoundException("Could not edit, provided id does not exist");
        }
        
        if (p.getFirstname().length() < 2) {

            throw new Exception("Firstname must be more than 2 characters");
        }

        if (p.getLastname().length() < 3) {

            throw new Exception("Lastname must be more than 3 characters");
        }

        if (p.getPhone().length() < 8 || p.getPhone().length() > 8 || !p.getPhone().matches("[0-9]+")) {

            throw new Exception("Phonenumber must be 8 digits");
        }

        EntityManager em = getEntityManager();
        p.setLastEdited(new Date());

        try {
            em.getTransaction().begin();
            em.merge(p);
            em.getTransaction().commit();

        } finally {
            em.close();
        }

        return p;
    }

}
